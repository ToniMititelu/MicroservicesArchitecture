from ninja import NinjaAPI
from .utils import GlobalAuth
from .categories.api import router as categories_router
from .games.api import router as games_router

api = NinjaAPI(auth=GlobalAuth())

@api.get("/test", auth=None)
def test(request):
    return {'result': 'No auth'}

@api.get("/test2")
def test2(request):
    return request.auth

api.add_router("/gamecategories/", categories_router)
api.add_router("/games/", games_router)