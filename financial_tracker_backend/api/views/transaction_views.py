from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_date
from api.serializers import TransactionSerializer, TransactionDateFilterSerializer
from users.models import Transaction

# View to filter transactions based on date range and account
class FilteredTransactionView(APIView):
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Initialize the serializer with query parameters from the request
        serializer = TransactionDateFilterSerializer(data=request.query_params)
        
        # Check if the provided data is valid
        if serializer.is_valid():
            # Extract validated data from the serializer
            start_date = serializer.validated_data.get('start_date')
            end_date = serializer.validated_data.get('end_date')
            account = serializer.validated_data.get('account')

            # Filter transactions based on the validated data
            transactions = Transaction.objects.filter(
                date__gte=start_date, date__lte=end_date, user=request.user, account__name=account
            )
            # Optimize query by selecting related fields
            transactions = transactions.select_related('category', 'transaction_type').all()
            
            # Serialize the filtered transactions
            transaction_serializer = TransactionSerializer(transactions, many=True)
            
            # Return the serialized data with a 200 OK status
            return Response(transaction_serializer.data, status=status.HTTP_200_OK)
        else:
            # Return validation errors with a 400 Bad Request status
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)