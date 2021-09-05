from typing import List

from ninja import Schema
from datetime import datetime


class Error(Schema):
    message: str


class Success(Schema):
    message: str


class GameCategoryIn(Schema):
    name: str


class GameCategoryOut(Schema):
    id: int
    name: str


class PlatformIn(Schema):
    code: str
    full_name: str


class PlatformOut(Schema):
    id: int
    code: str
    full_name: str


class CurrencyIn(Schema):
    code: str
    symbol: str


class CurrencyOut(Schema):
    id: int
    code: str
    symbol: str


class GameListingIn(Schema):
    name: str
    description: str
    price: float
    is_negotiable: bool = False
    is_sealed: bool = False
    is_digital: bool = False
    is_active: bool = True
    category_id: int
    currency_code: str
    platform_code: str


class ImageOut(Schema):
    image: str


class GameListingOut(Schema):
    id: int
    name: str
    description: str
    price: float
    user_id: str
    is_negotiable: bool = False
    is_sealed: bool = False
    is_digital: bool = False
    is_active: bool
    expiration_date: datetime
    category: GameCategoryOut
    platform: PlatformOut
    currency: CurrencyOut
    image_set: List[ImageOut]


class UserFavouriteIn(Schema):
    listing_id: int


class UserFavouriteOut(Schema):
    id: int
    user_id: str
    listing_id: int
