# Generated by Django 3.2.6 on 2021-08-03 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings_api', '0004_auto_20210803_1916'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='listings'),
        ),
    ]
