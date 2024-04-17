from rest_framework import serializers
from .models import Reservation
from product.serializers import ProductSerializer
from user.serializers import UserSerializer

class ReservationSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = '__all__'