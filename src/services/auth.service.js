const jwt = require('jsonwebtoken');

const db = require('../models');
const {hashString} = require('../utils/hash');
const {NotFoundError, HttpError} = require('../../errors');

const SECRET_KEY = process.env.SECRET_KEY ?? 'secret';

const {getRedisClient} = require('../utils/redisUtils');
const {EXPIRATION_TIME_SECONDS} = require('../../config');

module.exports = {
  async login(email, password) {
    const redisClient = await getRedisClient();
    const foundUser = await db
      .user
      .findOne({
        where: {
          email,
          password: hashString(password)
        }
      });
    

    if (!foundUser)
      throw new NotFoundError('user not found');
    
    const token = jwt.sign(foundUser.dataValues, SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: EXPIRATION_TIME_SECONDS,
    });

    // treating '1' as token exists
    redisClient.set(token, '1', {
      'EX': EXPIRATION_TIME_SECONDS
    });
    return { token };
  },

  async validateToken(token) {
    const redisClient = await getRedisClient();
    const userId = await redisClient.get(token);
    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    console.log(token);

    return jwt.verify(token, SECRET_KEY);
  }
};
