from django.db import models
from datetime import datetime, timedelta
from .validators import validate_price
from .utils import get_listing_expiration_date

class Model(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class GameCategory(Model):
    name = models.CharField(max_length=128)


class GameListing(Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    price = models.FloatField(validators=[validate_price])
    user_id = models.CharField(max_length=128)
    negotiable = models.BooleanField(default=False)
    is_sealed = models.BooleanField(default=False)
    is_digital = models.BooleanField(default=False)
    expiration_date = models.DateTimeField(default=get_listing_expiration_date())
    category = models.ForeignKey(GameCategory, on_delete=models.PROTECT)


class Image(Model):
    listing = models.ForeignKey(GameListing, on_delete=models.CASCADE)
    data = models.TextField()


class UserFavourite(Model):
    listing = models.ForeignKey(GameListing, on_delete=models.CASCADE)
    user_id = models.CharField(max_length=128)
