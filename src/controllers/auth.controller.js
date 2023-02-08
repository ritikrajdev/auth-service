const authService = require('../services/auth.service');

module.exports = {
  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const tokenObject = await authService.login(email, password);
      res.status(200).json(tokenObject);
    }
    catch (error) {
      next(error);
    }
  },

  async validateToken(req, res, next) {
    try {
      const {token} = req.body;
      const validatedData = await authService.validateToken(token);
      res.status(200).json(validatedData);
    } catch (error) {
      next(error);
    }
  }
};
