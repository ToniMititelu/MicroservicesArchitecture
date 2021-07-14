import redis


# class Publisher:
#     def __init__(self):
#         pass


publisher = redis.Redis(host='localhost', port=6379)
message = "sent message"
channel = "test"
send_message = "Python : " + message
publisher.publish(channel, send_message)
