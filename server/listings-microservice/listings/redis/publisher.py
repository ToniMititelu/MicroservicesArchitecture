import redis

publisher = redis.Redis(host='redis', port=6379)
message = "sent message"
channel = "test"
send_message = "Python : " + message
publisher.publish(channel, send_message)
