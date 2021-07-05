from ninja import NinjaAPI
from .utils import GlobalAuth
from .categories.api import router as categories_router
from .games.api import router as games_router
from .currencies.api import router as currencies_router
from .platforms.api import router as platforms_router
from .favorites.api import router as favorites_router

api = NinjaAPI(auth=GlobalAuth())


@api.get("/test", auth=None)
def test(request):
    return {'result': 'No auth'}


@api.get("/test2")
def test2(request):
    return request.auth


api.add_router("/categories/", categories_router)
api.add_router("/platforms/", platforms_router)
api.add_router("/listings/", games_router)
api.add_router("/currencies/", currencies_router)
api.add_router("/favorites/", favorites_router)
