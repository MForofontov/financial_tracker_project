from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import AccountSerializer
from api.models import Account

class AccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        accounts = Account.objects.filter(user=request.user)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)