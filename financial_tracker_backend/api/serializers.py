from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from users.models import Transaction, Account
from django.utils import timezone

User = get_user_model() # This will refer to CustomUser due to AUTH_USER_MODEL setting in settings.py

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims here if needed
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'address']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'balance']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'account_name', 'amount', 'date', 'description', 'transaction_type', 'category']
        
class TransactionDateFilterSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=True)
    end_date = serializers.DateField(required=True)
    account_name = serializers.CharField(required=True)
    
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # Convert naive date objects to timezone-aware datetime objects
        start_date = timezone.make_aware(timezone.datetime.combine(start_date, timezone.datetime.min.time()))
        end_date = timezone.make_aware(timezone.datetime.combine(end_date, timezone.datetime.min.time()))

        data['start_date'] = start_date
        data['end_date'] = end_date

        return data