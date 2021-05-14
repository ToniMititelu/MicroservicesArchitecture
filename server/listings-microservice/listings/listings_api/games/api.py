from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..utils import is_admin, is_owner
from ..schemas import GameListingIn, GameListingOut, Error, Success
from ..models import GameListing, GameCategory

router = Router()

@router.post("/", response={201: GameListingOut, 400: Error})
def create_game_listing(request, payload: GameListingIn):
    game_listing = payload.dict()
    category_id = game_listing.pop('category_id', None)
    try:
        game_category = GameCategory.objects.get(id=category_id)
    except GameCategory.DoesNotExist:
        return 400, {"message": "Game category not found"}
    
    game_listing['user_id'] = request.auth['id']
    game_listing = GameListing.objects.create(**game_listing, category=game_category)
    return 201, game_listing

@router.get("/", response=List[GameListingOut], auth=None)
def get_game_listings(request):
    game_listings = GameListing.objects.all()
    return game_listings

@router.get("/{game_listing_id}/", response=GameListingOut, auth=None)
def get_game_listing(request, game_listing_id: int):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    return game_listing

@router.put("/{game_listing_id}/", response={200: GameListingOut, 403: Error})
def update_game_listing(request, game_listing_id: int, payload: GameListingIn):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    if not is_admin(request.auth) and not is_owner(request.auth, game_listing):
        return 403, {"message": "Only admins and owners can edit listings"}
    for attr, value in payload.dict().items():
        setattr(game_listing, attr, value)
    game_listing.save()
    return game_listing

@router.delete("/{game_listing_id}/", response={200: Success, 403: Error})
def delete_game_listing(request, game_listing_id: int):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    if not is_admin(request.auth) and not is_owner(request.auth, game_listing):
        return 403, {"message": "Only admins and owners can delete a game listing"}
    game_listing.delete()
    return 200,{'message': f'Game category {game_listing_id} deleted successfully'}
