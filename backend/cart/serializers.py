from rest_framework import serializers
from django.contrib.auth.models import User
from product.serializers import *
from .serializers import  *
from api.serializers import *
from .models import *

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity')

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'total_price', 'items')

class CheckoutItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CheckoutItem
        fields = ('id', 'product', 'quantity')

class CheckoutSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    items = CheckoutItemSerializer(many=True, read_only=True)

    class Meta:
        model = Checkout
        fields = ('id', 'user', 'total_price', 'checkout_datetime', 'status', 'stock_updated', 'items')