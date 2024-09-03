from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from .serializers import UserSerializer, CustomTokenObtainPairSerializer

User = get_user_model() # This will refer to CustomUser due to AUTH_USER_MODEL setting in settings.py


# Create your views here.

class CustomTokenRefreshView(TokenRefreshView):
    pass

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data)

        refresh = serializer.validated_data['refresh']
        access = serializer.validated_data['access']

        # Set HTTP-only cookies
        response.set_cookie(
            'accessToken', 
            access, 
            httponly=True, 
            secure=True,  # Use True in production
            samesite='None',
            max_age=3600,  # Set expiry to 1 hour (match token expiry)
        )
        response.set_cookie(
            'refreshToken', 
            refresh, 
            httponly=True, 
            secure=True,  # Use True in production
            samesite='None',
            max_age=3600 * 24,  # Set expiry to 1 day (match token expiry)
        )

        # Remove tokens from response body
        response.data.pop('refresh')
        response.data.pop('access')

        return response

class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UserCreateView(generics.CreateAPIView):
    http_method_names = ['post']
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
