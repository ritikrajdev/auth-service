const { createClient } = require('redis');

const redisHost = process.env.REDIS_HOST ?? 'localhost';
const redisPort = process.env.REDIS_PORT ?? 6379;

const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`
});
redisClient.on('error', (err) => {
  console.error(err);
});

async function getRedisClient() {
  console.log(redisHost, redisPort);
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
