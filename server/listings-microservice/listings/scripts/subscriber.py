import redis
import json

from listings_api.models import GameListing

subscriber = redis.Redis(host='redis', port=6379)
channel = 'order-confirmed'
p = subscriber.pubsub()
p.subscribe(channel)

while True:
    message = p.get_message()
    if message and not message['data'] == 1:
        print(message['data'])
        message = message['data'].decode('utf-8')

        payload = json.loads(message)

        listing_id = payload.get('listingId')

        if listing_id is not None:
            listings = GameListing.objects.filter(id=listing_id)
            if listings.count() == 1:
                listing = listings[0]
                listing.is_active = False
                listing.save()
