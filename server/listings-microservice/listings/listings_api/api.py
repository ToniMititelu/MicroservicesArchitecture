from ninja import NinjaAPI
from ninja.security import HttpBearer

api = NinjaAPI()

@api.get("/test")
def test(request, a: int, b: int):
    return {'result': a + b}

@api.get("/test2")
def test2(request):
    return {'d': 'a'}