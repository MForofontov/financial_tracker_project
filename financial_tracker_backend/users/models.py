from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth import get_user_model
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    def __str__(self):
        return self.email


User = get_user_model()

class Category(models.Model):
    CATEGORY_TYPES = [
        ('income', 'Income'),
        ('food & drinks', 'Food & Drinks'),
        ('shopping', 'Shopping'),
        ('housing', 'Housing'),
        ('transportation', 'Transportation'),
        ('life & entertaiment', 'Life & Entertaiment'),
        ('other', 'Other'),
        ('set balance', 'Set Balance'),
    ]
    name = models.CharField(max_length=19, choices=CATEGORY_TYPES, unique=True)

    def __str__(self):
        return self.name
    
class SubCategory(models.Model):
    INCOME_SUBCATEGORIES = [
        ('salary', 'Salary'),
        ('bonus', 'Bonus'),
        ('interest', 'Interest'),
    ]

    FOOD_SUBCATEGORIES = [
        ('groceries', 'Groceries'),
        ('restaurants', 'Restaurants'),
        ('cafes', 'Cafes'),
    ]

    TRANSPORTATION_SUBCATEGORIES = [
        ('public_transport', 'Public Transport'),
        ('fuel', 'Fuel'),
        ('taxi', 'Taxi'),
    ]

    ENTERTAINMENT_SUBCATEGORIES = [
        ('movies', 'Movies'),
        ('concerts', 'Concerts'),
        ('games', 'Games'),
    ]
    
    SET_BALANCE_SUBCATEGORIES = [
        ('initial balance', 'Initial Balance'),
    ]
    SUBCATEGORY_CHOICES = FOOD_SUBCATEGORIES + TRANSPORTATION_SUBCATEGORIES + ENTERTAINMENT_SUBCATEGORIES + INCOME_SUBCATEGORIES + SET_BALANCE_SUBCATEGORIES

    name = models.CharField(max_length=50, choices=SUBCATEGORY_CHOICES)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.user.email} - {self.category.name} - {self.amount}"
    
class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)  # e.g., USD, EUR
    name = models.CharField(max_length=50)  # e.g., US Dollar, Euro
    symbol = models.CharField(max_length=5)  # e.g., $, €

    def __str__(self):
        return self.code

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.ForeignKey('Currency', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.email} - {self.name} - {self.balance}{self.Currency.symbol}"

class TransactionType(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
        ('set balance', 'Set Balance'),
    ]
    name = models.CharField(max_length=11, choices=TRANSACTION_TYPES, unique=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.ForeignKey('Account', on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    sub_category = models.ForeignKey('SubCategory', on_delete=models.CASCADE)
    transaction_type = models.ForeignKey('TransactionType', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.amount} - {self.transaction_type}"

class RecurringTransaction(models.Model):
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.ForeignKey('Account', on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    sub_category = models.ForeignKey('SubCategory', on_delete=models.CASCADE)
    transaction_type = models.ForeignKey('TransactionType', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    frequency = models.CharField(max_length=7, choices=FREQUENCY_CHOICES)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.amount} - {self.frequency}"