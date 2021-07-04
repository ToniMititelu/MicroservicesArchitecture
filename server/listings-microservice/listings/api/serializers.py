from rest_framework import serializers

from api.models import Platform, Currency, GameCategory, GameListing, UserFavourite


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'


class GameCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameCategory
        fields = '__all__'


class GameListingSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=GameCategory.objects.all())
    platform = serializers.SlugRelatedField(slug_field='code', queryset=Platform.objects.all())
    currency = serializers.SlugRelatedField(slug_field='code', queryset=Currency.objects.all())
    expiration_date = serializers.DateField(format=None, input_formats=['%Y-%m-%d'])

    class Meta:
        model = GameListing
        fields = '__all__'


class UserFavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavourite
        fields = '__all__'
