const joi = require('joi');

module.exports = {
  create: joi.object({
    email: joi
      .string()
      .email()
      .required(),

    password: joi
      .string()
      .min(8)
      .max(18)
      .required()
  })
};
