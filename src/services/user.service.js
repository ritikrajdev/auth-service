const db = require('../models');
const {hashString} = require('../utils/hash');

module.exports = {
  async createUser(email, password) {
    const newUser = await db
      .user
      .create({
        email,
        password: hashString(password)
      });
    delete newUser.dataValues.password;  
    return newUser;
  }
};
