from django.urls import path
from .views import UserList, UserCreateView, CustomTokenRefreshView, CustomTokenObtainPairView, UserStatusView, LogoutView, UserEmailView

urlpatterns = [
    path("list/", UserList.as_view(), name="users-list"),
    path("create/", UserCreateView.as_view(), name="user-create"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('status/', UserStatusView.as_view(), name='user-status'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/email/', UserEmailView.as_view(), name='user-email'),
]