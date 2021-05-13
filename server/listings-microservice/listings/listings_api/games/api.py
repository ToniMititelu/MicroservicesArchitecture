from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..schemas import GameListingIn, GameListingOut, Error
from ..models import GameListing, GameCategory

router = Router()

@router.post("/", response={201: GameListingOut, 400: Error})
def create_game_category(request, payload: GameListingIn):
    category_id = payload.dict().pop('category_id', None)
    if not category_id:
        return 400, {"message": "Game category not found"}

    try:
        game_category = GameCategory.objects.get(id=category_id)
    except GameCategory.DoesNotExist:
        return 400, {"message": "Game category not found"}
    
    game_listing = GameListing.objects.create(**payload.dict(), category=game_category)
    return 201, game_listing

@router.get("/", response=List[GameListingOut])
def get_game_listings(request):
    game_listings = GameListing.objects.all()
    return game_listings

@router.get("/{game_listing_id}/", response=GameListingOut)
def get_game_listing(request, game_listing_id: int):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    return game_listing

@router.put("/{game_listing_id}/", response=GameListingIn)
def update_game_listing(request, game_listing_id: int, payload: GameListingOut):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    for attr, value in payload.dict().items():
        setattr(game_listing, attr, value)
    game_listing.save()
    return game_listing

@router.delete("/{game_listing_id}/")
def delete_game_listing(request, game_listing_id: int):
    game_listing = get_object_or_404(GameListing, id=game_listing_id)
    game_listing.delete()
    return {'succes': True}