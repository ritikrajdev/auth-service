const jwt = require('jsonwebtoken');

const db = require('../models');
const {hashString} = require('../utils/hash');
const {NotFoundError} = require('../../errors');

const SECRET_KEY = process.env.SECRET_KEY ?? 'secret';

module.exports = {
  async login(email, password) {
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
        
    return { token: jwt.sign(foundUser.dataValues, SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '1h'
    }) };
  },

  validateToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }
};
