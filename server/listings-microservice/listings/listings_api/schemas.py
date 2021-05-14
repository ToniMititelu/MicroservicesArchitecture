from ninja import Schema
from datetime import datetime


class Error(Schema):
    message: str


class Success(Schema):
    message: str


class GameCategoryIn(Schema):
    name: str


class GameCategoryOut(Schema):
    name: str


class GameListingIn(Schema):
    name: str
    description: str
    price: float
    negotiable: bool = False
    is_sealed: bool = False
    is_digital: bool = False
    category_id: int


class GameListingOut(Schema):
    id: int
    name: str
    description: str
    price: float
    user_id: str
    negotiable: bool = False
    is_sealed: bool = False
    is_digital: bool = False
    expiration_date: datetime
    category: GameCategoryOut
