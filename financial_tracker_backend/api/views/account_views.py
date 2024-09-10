from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import AccountSerializer
from users.models import Account

# View to handle account-related operations
class AccountView(APIView):
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Retrieve all accounts associated with the authenticated user
        accounts = Account.objects.filter(user=request.user)
        # Serialize the retrieved accounts
        serializer = AccountSerializer(accounts, many=True)
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)