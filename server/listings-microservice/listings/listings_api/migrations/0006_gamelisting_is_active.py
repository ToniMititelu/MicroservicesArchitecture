# Generated by Django 3.2.6 on 2021-09-05 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings_api', '0005_alter_image_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamelisting',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]