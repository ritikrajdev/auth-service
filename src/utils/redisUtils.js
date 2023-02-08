const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';

const redisClient = createClient(redisUrl);
redisClient.on('error', (err) => {
  console.error(err);
});

async function getRedisClient() {
  if (!redisClient.isReady) {
    console.log('connecting to redis');
    await redisClient.connect();
  }

  return redisClient;
}

async function disconnectRedis() {
  if (redisClient.isReady)
    await redisClient.disconnect();
}


// good way to do so as in a file should only handle this right ?
const exitingEvents = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP', 'exit'];
for (const exitingEvent of exitingEvents) {
  process.on(exitingEvent, async () => {
    console.log('disconnecting to redis');
    await disconnectRedis();
  });
}

module.exports = {
  getRedisClient,
  disconnectRedis,
};
