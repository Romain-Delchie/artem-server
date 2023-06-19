const Joi = require('joi');

module.exports = Joi.object({
  account_id: Joi.number().integer().required(),
  delivery_address: Joi.string().required()
}).min(2).max(2);