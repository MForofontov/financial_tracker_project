from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_date
from api.serializers import TransactionSerializer, TransactionDateFilterSerializer
from users.models import Transaction

class FilteredTransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = TransactionDateFilterSerializer(data=request.query_params)
        if serializer.is_valid():
            start_date = serializer.validated_data.get('start_date')
            end_date = serializer.validated_data.get('end_date')
            account_name = serializer.validated_data.get('account_name')
            print(start_date, end_date)

            transactions = Transaction.objects.filter(
                date__gte=start_date, date__lte=end_date, user=request.user, account_name=account_name
            )
            transaction_serializer = TransactionSerializer(transactions, many=True)
            return Response(transaction_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)