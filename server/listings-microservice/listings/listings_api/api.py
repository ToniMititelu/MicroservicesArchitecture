from ninja import NinjaAPI
from ninja.security import HttpBearer
from .categories.api import router as categories_router

api = NinjaAPI()

@api.get("/test")
def test(request, a: int, b: int):
    return {'result': a + b}

@api.get("/test2")
def test2(request):
    return {'d': 'a reload test 2'}

api.add_router("/gamecategories/", categories_router)
