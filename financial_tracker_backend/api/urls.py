from django.urls import path
from .views import UserList, UserCreateView, CustomTokenRefreshView, CustomTokenObtainPairView

urlpatterns = [
    path("list/", UserList.as_view(), name="users-list"),
    path("create/", UserCreateView.as_view(), name="user-create"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]