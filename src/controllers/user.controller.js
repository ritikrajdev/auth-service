const userServices = require('../services/user.service');

module.exports = {
  async createUser(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userServices.createUser(email, password);
      res.status(201).json(userData);
    } catch (err) {
      next(err);
    }
  }
};
