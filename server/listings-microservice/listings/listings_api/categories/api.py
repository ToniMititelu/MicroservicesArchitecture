from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..schemas import GameCategoryIn, GameCategoryOut
from ..models import GameCategory

router = Router()

@router.post("/", response=GameCategoryOut)
def create_game_category(request, payload: GameCategoryIn):
    game_category = GameCategory.objects.create(**payload.dict())
    return game_category

@router.get("/", response=List[GameCategoryOut])
def get_game_categories(request):
    game_categories = GameCategory.objects.all()
    return game_categories

@router.get("/{game_category_id}/", response=GameCategoryOut)
def get_game_category(request, game_category_id: int):
    game_category = get_object_or_404(GameCategory, id=game_category_id)
    return game_category

@router.put("/{game_category_id}/", response=GameCategoryOut)
def update_game_category(request, game_category_id: int, payload: GameCategoryIn):
    game_category = get_object_or_404(GameCategory, id=game_category_id)
    for attr, value in payload.dict().items():
        setattr(game_category, attr, value)
    game_category.save()
    return game_category

@router.delete("/{game_category_id}/")
def delete_game_category(request, game_category_id: int):
    game_category = get_object_or_404(GameCategory, id=game_category_id)
    game_category.delete()
    return {'succes': True}