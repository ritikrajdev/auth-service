const joi = require('joi');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const { HttpError, NotFoundError } = require('../../errors');

module.exports = {
  handleErrors(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    
    console.error(err);
    switch (err.constructor) {
    case joi.ValidationError:
    case sequelize.UniqueConstraintError:
    case sequelize.ValidationError: {
      return res.status(400).json({message: err.message});
    }
    case jwt.TokenExpiredError:
    case jwt.JsonWebTokenError: {
      return res.status(401).json({message: err.message});
    }
    case NotFoundError: {
      return res.status(404).json({message: err.message});
    }
    case HttpError: {
      return res.status(err.status).json({message: err.message});
    }
    default: {
      return res.status(500).json({message: 'Something unexpected happened'});
    }
    }
  }
};
