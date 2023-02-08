const router = require('express').Router();
const {generateValidationMiddleware} = require('../middlewares/validation');
const {handleErrors} = require('../middlewares/errorHandler');

const userController = require('../controllers/user.controller.js');
const userSchema = require('../schemas/user.schema');

const authController = require('../controllers/auth.controller.js');
const authSchema = require('../schemas/auth.schema');

router.post(
  '/users',
  generateValidationMiddleware(userSchema.create),
  userController.createUser
);

router.post(
  '/login',
  generateValidationMiddleware(authSchema.login),
  authController.login
);
router.post(
  '/token/validate',
  generateValidationMiddleware(authSchema.validateToken),
  authController.validateToken
);

router.use(handleErrors);

module.exports = router;
