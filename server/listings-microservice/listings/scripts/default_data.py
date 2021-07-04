from api.models import Platform, Currency, GameCategory


def create_platforms():
    new_platforms = [
        Platform(code='ps', full_name='Sony PlayStation'),
        Platform(code='xbox', full_name='Microsoft Xbox'),
        Platform(code='pc', full_name='PC'),
        Platform(code='switch', full_name='Nintendo Switch'),
        Platform(code='other', full_name='Other'),
    ]
    existent_platforms = Platform.objects.all()
    for platform in new_platforms:
        if existent_platforms.filter(code=platform.code).exists():
            continue
        platform.save()


def create_currencies():
    new_currencies = [
        Currency(code='EUR', symbol='€'),
        Currency(code='USD', symbol='$'),
        Currency(code='RON', symbol='lei'),
        Currency(code='GBP', symbol='£'),
    ]
    existent_currencies = Currency.objects.all()
    for currency in new_currencies:
        if existent_currencies.filter(code=currency.code).exists():
            continue
        currency.save()


def create_categories():
    new_gc = [
        GameCategory(name='Action'),
        GameCategory(name='Adventure'),
        GameCategory(name='RTS'),
        GameCategory(name='RPG'),
        GameCategory(name='Simulator'),
    ]
    existent_gc = GameCategory.objects.all()
    for gc in new_gc:
        if existent_gc.filter(name=gc.name).exists():
            continue
        gc.save()


def run():
    create_platforms()
    create_currencies()
    create_categories()
    return