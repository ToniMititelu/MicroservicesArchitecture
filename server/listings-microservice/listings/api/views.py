# Create your views here.
from rest_framework.viewsets import ModelViewSet

from api.models import (
    Platform,
    Currency,
    GameCategory,
    GameListing,
    UserFavourite
)
from api.serializers import (
    PlatformSerializer,
    CurrencySerializer,
    GameCategorySerializer,
    GameListingSerializer,
    UserFavouriteSerializer
)


class PlatformViewSet(ModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer


class CurrencyViewSet(ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer


class GameCategoryViewSet(ModelViewSet):
    queryset = GameCategory.objects.all()
    serializer_class = GameCategorySerializer


class GameListingViewSet(ModelViewSet):
    queryset = GameListing.objects.all()
    serializer_class = GameListingSerializer


class UserFavouriteViewSet(ModelViewSet):
    queryset = UserFavourite.objects.all()
    serializer_class = UserFavouriteSerializer
