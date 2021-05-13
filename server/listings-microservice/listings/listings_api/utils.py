from datetime import datetime, timedelta

def get_listing_expiration_date():
    return datetime.now() + timedelta(days=30)