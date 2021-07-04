from django.core.exceptions import ValidationError


def validate_price(value):
    if value <= 0:
        raise ValidationError("Price must be a positive number bigger than 0")
