from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..utils import is_admin
from ..schemas import GameCategoryIn, GameCategoryOut, Error, Success
from ..models import GameCategory

router = Router()

@router.post("/", response={201: GameCategoryOut, 403: Error})
def create_game_category(request, payload: GameCategoryIn):
    if not is_admin(request.auth):
        return 403, {"message": "Only admins can create a game category"}
    game_category = GameCategory.objects.create(**payload.dict())
    return 201, game_category

@router.get("/", response=List[GameCategoryOut], auth=None)
def get_game_categories(request):
    game_categories = GameCategory.objects.all()
    return game_categories

@router.get("/{game_category_id}/", response=GameCategoryOut, auth=None)
def get_game_category(request, game_category_id: int):
    game_category = get_object_or_404(GameCategory, id=game_category_id)
    return game_category

@router.put("/{game_category_id}/", response={200: GameCategoryOut, 403: Error})
def update_game_category(request, game_category_id: int, payload: GameCategoryIn):
    if not is_admin(request.auth):
        return 403, {"message": "Only admins can update a game category"}
    game_category = get_object_or_404(GameCategory, id=game_category_id)
    for attr, value in payload.dict().items():
        setattr(game_category, attr, value)
    game_category.save()
    return game_category

@router.delete("/{game_category_id}/", response={200: Success, 403: Error})
def delete_game_category(request, game_category_id: int):
    if not is_admin(request.auth):
        return 403, {"message": "Only admins can delete a game category"}
    game_category = get_object_or_404(GameCategory, id=game_category_id)
    game_category.delete()
    return 200, {'message': f'Game category {game_category_id} deleted successfully'}
