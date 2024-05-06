from rest_framework import serializers
from . models import *
from django.contrib.auth.models import User

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id','seller', 'name','stock', 'description', 'price', 'discount', 'image')