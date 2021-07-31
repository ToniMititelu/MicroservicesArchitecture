from django.db.models import Q
from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ..utils import is_admin, is_owner, get_listing_expiration_date
from ..schemas import GameListingIn, GameListingOut, Error, Success, UserFavouriteOut, UserFavouriteIn
from ..models import GameListing, GameCategory, Currency, Platform, UserFavourite

router = Router()


@router.post("/", response={201: GameListingOut, 400: Error})
def create_game_listing(request, payload: GameListingIn):
    game_listing = payload.dict()

    category_id = game_listing.pop('category_id', None)
    try:
        game_category = GameCategory.objects.get(id=category_id)
    except GameCategory.DoesNotExist:
        return 400, {"message": "Game category not found"}

    currency_code = game_listing.pop('currency_code', None)
    try:
        currency = Currency.objects.get(code=currency_code)
    except Currency.DoesNotExist:
        return 400, {"message": "Currency not found"}

    platform_code = game_listing.pop('platform_code', None)
    try:
        platform = Platform.objects.get(code=platform_code)
    except Platform.DoesNotExist:
        return 400, {"message": "Platform not found"}

    game_listing['user_id'] = request.auth['id']
    game_listing['category'] = game_category
    game_listing['currency'] = currency
    game_listing['platform'] = platform
    game_listing['expiration_date'] = get_listing_expiration_date()
    game_listing = GameListing.objects.create(**game_listing)
    return 201, game_listing


@router.get("/", response=List[GameListingOut], auth=None)
def get_game_listings(request, user_id: str = None, status: str = None):
    game_listings = GameListing.objects.all()
    if user_id:
        game_listings = game_listings.filter(user_id=user_id)
    if status:
        filters = dict()
        now = timezone.now()
        if status == 'active':
            filters['expiration_date__gte'] = now
        elif status == 'inactive':
            filters['expiration_date__lt'] = now
        game_listings = game_listings.filter(**filters)
    return game_listings


@router.get("/mine/", response=List[GameListingOut])
def get_my_game_listings(request):
    game_listings = GameListing.objects.filter(user_id=request.auth['id'])
    return game_listings


@router.get("/favorites/", response=List[GameListingOut])
def get_my_favorites_listings(request):
    user_favorites = [u.id for u in UserFavourite.objects.filter(user_id=request.auth['id'])]
    game_listings = GameListing.objects.filter(id__in=user_favorites)
    return game_listings


@router.post("/favorites/", response=UserFavouriteOut)
def add_listing_to_favorites(request, payload: UserFavouriteIn):
    payload = payload.dict()
    favourite = UserFavourite.objects.create(user_id=request.auth['id'], **payload)
    return favourite


@router.delete("/favorites/{favourite_id}/", response={200: Success, 403: Error})
def delete_user_favourite(request, favourite_id: int):
    game_listing = get_object_or_404(UserFavourite, id=favourite_id)
    if not is_admin(request.auth) and not is_owner(request.auth, game_listing):
        return 403, {"message": "Only admins and owners can delete a game listing"}
    game_listing.delete()
    return 200, {'message': f'Removed from favourites'}


@router.get("/{game_listing_id}/", response=GameListingOut, auth=None)
def get_game_listing(request, game_listing_id: int):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    return game_listing


@router.put("/{game_listing_id}/", response={200: GameListingOut, 403: Error}, auth=None)
def update_game_listing(request, game_listing_id: int, payload: GameListingIn):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    if not is_admin(request.auth) and not is_owner(request.auth, game_listing):
        return 403, {"message": "Only admins and owners can edit listings"}

    payload = payload.dict()
    category_id = payload.pop('category_id', None)
    try:
        game_category = GameCategory.objects.get(id=category_id)
    except GameCategory.DoesNotExist:
        return 400, {"message": "Game category not found"}

    currency_code = payload.pop('currency_code', None)
    try:
        currency = Currency.objects.get(code=currency_code)
    except Currency.DoesNotExist:
        return 400, {"message": "Currency not found"}

    platform_code = payload.pop('platform_code', None)
    try:
        platform = Platform.objects.get(code=platform_code)
    except Platform.DoesNotExist:
        return 400, {"message": "Platform not found"}

    payload['category'] = game_category
    payload['currency'] = currency
    payload['platform'] = platform
    for attr, value in payload.items():
        setattr(game_listing, attr, value)
    game_listing.save()
    return 200, game_listing


@router.delete("/{game_listing_id}/", response={200: Success, 403: Error})
def delete_game_listing(request, game_listing_id: int):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    if not is_admin(request.auth) and not is_owner(request.auth, game_listing):
        return 403, {"message": "Only admins and owners can delete a game listing"}
    game_listing.delete()
    return 200, {'message': f'Game category {game_listing_id} deleted successfully'}
