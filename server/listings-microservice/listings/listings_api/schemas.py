from ninja import Schema

class GameCategoryIn(Schema):
    name: str

class GameCategoryOut(Schema):
    name: str