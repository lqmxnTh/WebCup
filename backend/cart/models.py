from django.db import models
from django.contrib.auth.models import User
from product.models import Product

# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Cart for {self.user.username}"
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.product.name} - ({self.quantity})"

class Checkout(models.Model):
    STATUS_CHOICES = [
        ('placed_order', 'Placed Order'),
        ('processing_payment', 'Processing Payment'),
        ('confirm_payment', 'Confirm Payment'),
        ('shipping_in_progress', 'Shipping In Progress'),
        ('order_done', 'Order Done'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    checkout_datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    stock_updated = models.BooleanField(default=False)  # New field to track stock update

    def __str__(self):
        return f"{self.user} - Rs {self.total_price}"
    
class CheckoutItem(models.Model):
    checkout = models.ForeignKey(Checkout, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} - ({self.quantity})"
