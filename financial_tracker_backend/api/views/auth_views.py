from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.serializers import CustomTokenObtainPairSerializer

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

        response.set_cookie(
            'accessToken', 
            access, 
            httponly=True, 
            secure=True,  
            samesite='None',
            max_age=3600,  
        )

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

        response.set_cookie(
            'accessToken', 
            access, 
            httponly=True, 
            secure=True,  
            samesite='None',
            max_age=3600,  
        )
        response.set_cookie(
            'refreshToken', 
            refresh, 
            httponly=True, 
            secure=True,  
            samesite='None',
            max_age=3600 * 24,  
        )

        response.data.pop('refresh')
        response.data.pop('access')

        return response

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        response.delete_cookie('accessToken')
        response.delete_cookie('refreshToken')
        return response

class UserStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({"message": "User is authenticated"}, status=status.HTTP_200_OK)