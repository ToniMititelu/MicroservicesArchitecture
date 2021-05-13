from django.contrib import admin
from .models import GameCategory, GameListing, UserFavourite, Image

# Register your models here.
admin.site.register(GameCategory)
admin.site.register(GameListing)
admin.site.register(UserFavourite)
admin.site.register(Image)