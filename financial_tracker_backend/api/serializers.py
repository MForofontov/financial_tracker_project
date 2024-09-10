from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from users.models import Transaction, Account
from django.utils import timezone

User = get_user_model() # This will refer to CustomUser due to AUTH_USER_MODEL setting in settings.py

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Call the parent class's get_token method to get the default token
        token = super().get_token(user)
        # Add custom claims here if needed
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = User
        # Define the fields to include in the serialized output
        fields = ('id', 'email', 'password')
        # Specify that the password field should be write-only
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        # Create a new user instance using the validated data
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        # Return the created user instance
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    # Meta class to specify the model and fields to be serialized
    class Meta:
        # Specify the model to be serialized
        model = User
        # Define the fields to include in the serialized output
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'address']

class AccountSerializer(serializers.ModelSerializer):
    # Meta class to specify the model and fields to be serialized
    class Meta:
        # Specify the model to be serialized
        model = Account
        # Define the fields to include in the serialized output
        fields = ['id', 'name', 'balance']

class TransactionSerializer(serializers.ModelSerializer):
    # Define custom fields to include the names of the related category and transaction type
    category_name = serializers.SerializerMethodField()
    transaction_type_name = serializers.SerializerMethodField()

    class Meta:
        # Specify the model to be serialized
        model = Transaction
        # Define the fields to include in the serialized output
        fields = ['user', 'account', 'amount', 'date', 'description', 'category_name', 'transaction_type_name']
    
    # Methods to get the name of the related category
    def get_category_name(self, obj):
        return obj.category.name

    def get_transaction_type_name(self, obj):
        return obj.transaction_type.name
        
class TransactionDateFilterSerializer(serializers.Serializer):
    # Method to get the name of the related category
    start_date = serializers.DateField(required=True)
    end_date = serializers.DateField(required=True)
    account = serializers.CharField(required=True)
    
    def validate(self, data):
        # Extract start_date and end_date from the validated data
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # Convert naive date objects to timezone-aware datetime objects
        start_date = timezone.make_aware(timezone.datetime.combine(start_date, timezone.datetime.min.time()))
        end_date = timezone.make_aware(timezone.datetime.combine(end_date, timezone.datetime.min.time()))

        # Update the data dictionary with the timezone-aware datetime objects
        data['start_date'] = start_date
        data['end_date'] = end_date

        # Return the validated and updated data
        return data