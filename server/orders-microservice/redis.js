const redis = require('redis');

const redisClient = redis.createClient(6379, 'redis');

module.exports = {
    redisClient
};