import jwt
from datetime import datetime, timedelta

secret_key = 'secret-jwt-key'


def verify_token(token):
    try:
        return jwt.decode(token, secret_key, algorithms=['HS256'])
    except jwt.InvalidTokenError:
        return None


def get_listing_expiration_date() -> datetime:
    return datetime.now() + timedelta(days=30)


def is_admin(payload):
    return payload['role'] == 'Admin'


def is_owner(payload, resource):
    return payload['id'] == resource.user_id