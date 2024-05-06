from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Checkout, CheckoutItem
from .serializers import CartSerializer, CartItemSerializer, CheckoutSerializer, CheckoutItemSerializer
from product.models import *

# Add to Cart
@api_view(['POST'])
def add_to_cart(request):
    user_id = request.data.get('user_id')
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))  # Convert quantity to integer

    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    if not product_id:
        return Response({"detail": "Variant ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, id=user_id)
    product = get_object_or_404(Product, id=product_id)

    # Check if the requested quantity exceeds the available stock
    if quantity > product.stock:
        return Response({"detail": f"Requested quantity exceeds available stock for {product.name}."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        cart = Cart.objects.create(user=user)

    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        # Check if adding the requested quantity will exceed the available stock
        if cart_item.quantity + quantity > product.stock:
            return Response({"detail": f"Requested quantity exceeds available stock for {product.name}."}, status=status.HTTP_400_BAD_REQUEST)
        cart_item.quantity += quantity
        cart_item.save()
    except CartItem.DoesNotExist:
        CartItem.objects.create(cart=cart, product=product, quantity=quantity)

    # Calculate total price after adding the item to the cart using a for loop
    total_price = 0
    for item in cart.items.all():
        total_price += item.quantity * item.product.price

    cart.total_price = total_price
    cart.save()

    return Response({"detail": "Item added to cart successfully.", "total_price": cart.total_price}, status=status.HTTP_201_CREATED)

# Get Cart by User ID
@api_view(['GET'])
def get_cart_by_user_id(request, id):
    user = get_object_or_404(User, pk=id)
    cart = get_object_or_404(Cart, user=user)
    cart_serializer = CartSerializer(cart)
    return Response(cart_serializer.data, status=status.HTTP_200_OK)

# Remove from Cart
@api_view(['POST'])
def remove_from_cart(request,id):
    try:
        cart_item = CartItem.objects.get(id=id)
        cart_item.delete()
        return Response({"detail": "Cart item removed successfully."}, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def checkout(request):
    cart_id = request.data.get('cart_id')
    user_id = request.data.get('user_id')

    try:
        user = User.objects.get(id=user_id)
        cart = Cart.objects.get(id=cart_id)
        cart_serializer = CartSerializer(cart)
        serialized_data = cart_serializer.data
        variant_items = serialized_data['items']

        total_price = cart.total_price

        # Create Checkout instance with user, total_price, and status
        checkout = Checkout.objects.create(
            user=user,
            total_price=total_price,
            status='placed_order'
        )

        for item in variant_items:
            print(item)
            variant_id = item['product']['id']
            quantity = item['quantity']
            variant = Product.objects.get(id=variant_id)

            # Create CheckoutItem instance with order ID
            checkout_item = CheckoutItem.objects.create(
                checkout=checkout,
                product=variant,
                quantity=quantity
            )

        cart.delete()

        # Include order_id in the response
        order_id = checkout.id
        status_display = checkout.get_status_display()  # Get the display value for status

        return Response({"detail": "Checkout successful.", "order_id": order_id, "status": status_display}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    except Cart.DoesNotExist:
        return Response({"detail": "Cart not found for this user."}, status=status.HTTP_404_NOT_FOUND)



# Get Orders by User ID
@api_view(['POST'])
def get_orders_by_user_id(request):
    user_id = request.data.get('user_id')

    try:
        user = User.objects.get(pk=user_id)
        orders = Checkout.objects.filter(user=user).order_by('-id')  # Modified line
        serializer = CheckoutSerializer(orders, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

