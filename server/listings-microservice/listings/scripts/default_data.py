from listings_api.models import Platform, Currency, GameCategory, GameListing

def create_platforms():
    Platform.objects.all().delete()
    Platform.objects.bulk_create([
        Platform(short_name='ps', full_name='Sony PlayStation'),
        Platform(short_name='xbox', full_name='Microsoft Xbox'),
        Platform(short_name='pc', full_name='PC'),
        Platform(short_name='switch', full_name='Nintendo Switch'),
        Platform(short_name='other', full_name='Other'),
    ])

def create_currencies():
    Currency.objects.all().delete()
    Currency.objects.bulk_create([
        Currency(name='EURO', symbol='€'),
        Currency(name='DOLLAR', symbol='$'),
        Currency(name='RON', symbol='lei'),
        Currency(name='GBP', symbol='£'),
    ])

def create_categories():
    GameCategory.objects.all().delete()
    GameCategory.objects.bulk_create([
        GameCategory(name='Action'),
        GameCategory(name='Adventure'),
        GameCategory(name='RTS'),
        GameCategory(name='RPG'),
        GameCategory(name='Simulator'),
    ])

def run():
    # create_platforms()
    # create_currencies()
    # create_categories()
    return