# Generated by Django 3.2 on 2021-05-13 14:44

import datetime
from django.db import migrations, models
import django.db.models.deletion
import listings_api.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=128)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GameListing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=128)),
                ('description', models.TextField()),
                ('price', models.FloatField(validators=[listings_api.validators.validate_price])),
                ('user_id', models.CharField(max_length=128)),
                ('negotiable', models.BooleanField(default=False)),
                ('is_sealed', models.BooleanField(default=False)),
                ('is_digital', models.BooleanField(default=False)),
                ('expiration_date', models.DateTimeField(default=datetime.datetime(2021, 6, 12, 14, 43, 59, 939726))),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='listings_api.gamecategory')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserFavourite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id', models.CharField(max_length=128)),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='listings_api.gamelisting')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('data', models.TextField()),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='listings_api.gamelisting')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]