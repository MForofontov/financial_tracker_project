from django.urls import path
from api.views.auth_views import CustomTokenObtainPairView, CustomTokenRefreshView, UserStatusView, LogoutView
from api.views.users_views import UsersList, UserCreateView, UserProfileView
from api.views.account_views import AccountView
from api.views.transaction_views import FilteredTransactionView

urlpatterns = [
    path("list/", UsersList.as_view(), name="users-list"),

    path("create/", UserCreateView.as_view(), name="user-create"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('status/', UserStatusView.as_view(), name='user-status'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('accounts/', AccountView.as_view(), name='account-list'),
    path('filtered-transactions/', FilteredTransactionView.as_view(), name='filtered-transaction-list'),

]