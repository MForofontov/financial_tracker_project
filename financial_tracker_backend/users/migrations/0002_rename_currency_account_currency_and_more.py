# Generated by Django 5.0.7 on 2024-09-11 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="account",
            old_name="Currency",
            new_name="currency",
        ),
        migrations.AlterField(
            model_name="subcategory",
            name="name",
            field=models.CharField(
                choices=[
                    ("groceries", "Groceries"),
                    ("restaurants", "Restaurants"),
                    ("cafes", "Cafes"),
                    ("public_transport", "Public Transport"),
                    ("fuel", "Fuel"),
                    ("taxi", "Taxi"),
                    ("movies", "Movies"),
                    ("concerts", "Concerts"),
                    ("games", "Games"),
                    ("salary", "Salary"),
                    ("bonus", "Bonus"),
                    ("interest", "Interest"),
                    ("initial balance", "Initial Balance"),
                ],
                max_length=50,
            ),
        ),
    ]
