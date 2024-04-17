from django.shortcuts import render
from rest_framework import viewsets, views, response
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        return user

class UserCurrent(views.APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return response.Response(serializer.data)
