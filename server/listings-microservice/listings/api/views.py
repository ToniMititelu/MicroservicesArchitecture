# Create your views here.
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.models import (
    Platform,
    Currency,
    GameCategory,
    GameListing,
    UserFavourite
)
from api.permissions import HasValidToken
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
    permission_classes = [HasValidToken]

    @action(detail=False, methods=['get'])
    def mine(self, request, *args, **kwargs):
        listings = GameListing.objects.filter(id=3)
        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)


class UserFavouriteViewSet(ModelViewSet):
    queryset = UserFavourite.objects.all()
    serializer_class = UserFavouriteSerializer
