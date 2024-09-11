from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Account, Transaction, TransactionType, Category, SubCategory

# Signal receiver to update account balance after a transaction is saved
@receiver(post_save, sender=Transaction)
def update_account_balance(sender, instance, **kwargs):
    # Get the account associated with the transaction
    account = instance.account
    # Retrieve all transactions for the account
    transactions = Transaction.objects.filter(account=account)
    # Calculate the total amount of all transactions for the account
    total_amount = sum(transaction.amount for transaction in transactions)
    # Update the account balance with the total amount
    account.balance = total_amount
    # Save the updated account balance
    account.save()

# Signal receiver to create a 'set balance' transaction when a new account is created
@receiver(post_save, sender=Account)
def create_set_balance_transaction(sender, instance, created, **kwargs):
    # Check if the account was created (not just updated)
    if created:
        # Get the 'set balance' transaction type
        set_balance_type = TransactionType.objects.get(name='set balance')
        # Get the 'set balance' category
        set_balance_category = Category.objects.get(name='set balance')
        # Get the subcategory 'initial balance'
        set_balance_subcategory = SubCategory.objects.get(name='initial balance')
        # Create a new transaction to set the initial balance of the account
        Transaction.objects.create(
            user=instance.user,
            account=instance,
            category=set_balance_category,
            sub_category=set_balance_subcategory,
            transaction_type=set_balance_type,
            amount=instance.balance
        )