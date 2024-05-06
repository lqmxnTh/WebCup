# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from product.models import Product
from .serializers import ProductSerializer

@api_view(['POST'])
def sell_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
