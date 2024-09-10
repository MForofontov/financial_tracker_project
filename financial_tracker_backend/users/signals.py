from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Account, Transaction, TransactionType, Category

@receiver(post_save, sender=Transaction)
def update_account_balance(sender, instance, **kwargs):
    account = instance.account_name
    transactions = Transaction.objects.filter(account_name=account)
    total_amount = sum(transaction.amount for transaction in transactions)
    account.balance = total_amount
    account.save()
    
@receiver(post_save, sender=Account)
def create_set_balance_transaction(sender, instance, created, **kwargs):
    if created:
        set_balance_type = TransactionType.objects.get(transaction_type='set balance')
        set_balance_category = Category.objects.get(category_type='set balance')
        Transaction.objects.create(
            user=instance.user,
            account_name=instance,
            category=set_balance_category,
            transaction_type=set_balance_type,
            amount=instance.balance
        )