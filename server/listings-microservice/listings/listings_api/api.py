from ninja import NinjaAPI
from ninja.security import HttpBearer
from .categories.api import router as categories_router
from .games.api import router as games_router

api = NinjaAPI()

@api.get("/test")
def test(request, a: int, b: int):
    return {'result': a + b}

@api.get("/test2")
def test2(request):
    return {'d': 'a reload test 2'}

api.add_router("/gamecategories/", categories_router)
api.add_router("/games/", games_router)