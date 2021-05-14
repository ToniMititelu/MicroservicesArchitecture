from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..schemas import UserFavouriteOut, UserFavouriteIn, Error, Success
from ..models import UserFavourite, GameListing
from ..utils import is_admin, is_owner

router = Router()

@router.post("/", response={201: UserFavouriteOut, 400: Error})
def create_user_favourite(request, payload: UserFavouriteIn):
    user_favourite = payload.dict()

    listing_id = user_favourite.pop('listing_id', None)
    try:
        listing = GameListing.objects.get(id=listing_id)
    except GameListing.DoesNotExist:
        return 400, {"message": "Game listing not found"}
    
    user_favourite['user_id'] = request.auth['id']
    user_favourite['listing'] = listing
    user_favourite = UserFavourite.objects.create(**user_favourite)
    return 201, user_favourite

@router.get("/", response=List[UserFavouriteOut], auth=None)
def get_favorites(request):
    favorites = UserFavourite.objects.all()
    return favorites

@router.get("/mine/", response=List[UserFavouriteOut])
def get_favorites(request):
    favorites = UserFavourite.objects.filter(user_id=request.auth['id'])
    return favorites

@router.get("/{user_favourite_id}/", response=UserFavouriteOut, auth=None)
def get_user_favourite(request, user_favourite_id: int):
    user_favourite = get_object_or_404(UserFavourite, id=user_favourite_id)
    return user_favourite

@router.delete("/{user_favourite_id}/", response={200: Success, 403: Error})
def delete_game_listing(request, user_favourite_id: int):
    user_favourite = get_object_or_404(GameListing, id=user_favourite_id)
    if not is_admin(request.auth) and not is_owner(request.auth, user_favourite):
        return 403, {"message": "Only admins and owners can delete a game listing from favorites"}
    user_favourite.delete()
    return 200,{'message': f'Removed {user_favourite_id} from favorites'}
