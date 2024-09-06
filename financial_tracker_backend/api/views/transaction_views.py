from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_date
from api.serializers import TransactionSerializer
from api.models import Transaction

class FilteredTransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        account = request.query_params.get('account')

        if not start_date or not end_date:
            return Response({"error": "Please provide both start_date and end_date"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            start_date = parse_date(start_date)
            end_date = parse_date(end_date)
        except ValueError:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        transactions = Transaction.objects.filter(date__gte=start_date, date__lte=end_date, user=request.user, account=account)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)