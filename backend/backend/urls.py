"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from api.views import *
from cart.views import *
from product.views import *
from sell.views import *
urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('product/',product_list),
                  path('product/<int:id>',get_product_by_id),
                  path('login',login),
                  path('signup',signup),
                  path('test_token',test_token),
                  path('cart/add', add_to_cart),
                  path('cart/remove/<int:id>', remove_from_cart),
                  path('cart/<int:id>', get_cart_by_user_id),
                  path('checkout', checkout),
                  path('order', get_orders_by_user_id),
                  path('sell/', sell_product,),
              ]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)