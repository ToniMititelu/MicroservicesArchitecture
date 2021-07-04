from django.db import models
from django.utils import timezone
from .validators import validate_price


class Model(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class GameCategory(Model):
    name = models.CharField(max_length=128)


class Currency(Model):
    name = models.CharField(max_length=8)
    symbol = models.CharField(max_length=4)


class Platform(Model):
    short_name = models.CharField(max_length=8)
    full_name = models.CharField(max_length=16)


class GameListing(Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    price = models.FloatField(validators=[validate_price])
    user_id = models.CharField(max_length=128)
    is_negotiable = models.BooleanField(default=False)
    is_sealed = models.BooleanField(default=False)
    is_digital = models.BooleanField(default=False)
    expiration_date = models.DateTimeField()
    category = models.ForeignKey(GameCategory, on_delete=models.PROTECT)
    platform = models.ForeignKey(Platform, on_delete=models.PROTECT, null=True)
    currency = models.ForeignKey(Currency, on_delete=models.PROTECT, null=True)

    @property
    def is_active(self):
        """Check if listing is still active"""
        return timezone.now() < self.expiration_date


class Image(Model):
    listing = models.ForeignKey(GameListing, on_delete=models.CASCADE)
    data = models.TextField()


class UserFavourite(Model):
    listing = models.ForeignKey(GameListing, on_delete=models.CASCADE)
    user_id = models.CharField(max_length=128)
