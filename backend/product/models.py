from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=300)
    price = models.IntegerField()
    discount = models.IntegerField(blank=True, null=True)
    seller = models.ForeignKey(User,on_delete=models.CASCADE)
    stock = models.IntegerField()
    image = models.ImageField(upload_to="product_images/")

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product_images/")

    def __str__(self):
        return f"Image for {self.product.name}"
