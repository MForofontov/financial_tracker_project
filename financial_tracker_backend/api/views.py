from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import UserSerializer, CustomTokenObtainPairSerializer

User = get_user_model() # This will refer to CustomUser due to AUTH_USER_MODEL setting in settings.py


# Create your views here.

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refreshToken')
        if not refresh_token:
            return Response({'detail': 'Refresh token missing'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'refresh': refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        response = Response(serializer.validated_data)
        access = serializer.validated_data.get('access')

        # Set HTTP-only cookies
        response.set_cookie(
            'accessToken', 
            access, 
            httponly=True, 
            secure=True,  # Use True in production
            samesite='None',
            max_age=3600,  # Set expiry to 1 hour (match token expiry)
        )

        # Remove tokens from response body
        response.data.pop('refresh', None)
        response.data.pop('access', None)

        return response

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

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        
        # Clear the cookies
        response.delete_cookie('accessToken')
        response.delete_cookie('refreshToken')
        
        return response

class UserStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({"message": "User is authenticated"}, status=status.HTTP_200_OK)
    
class UserCreateView(generics.CreateAPIView):
    http_method_names = ['post']
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UserEmailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_email = request.user.email
        return Response({"email": user_email}, status=status.HTTP_200_OK)