const Joi = require('joi');

module.exports = Joi.object({
  account_id: Joi.number().integer().required(),
  delivery_address_id: Joi.number().integer().required()
}).min(2).max(2);