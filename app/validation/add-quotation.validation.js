const Joi = require('joi');

module.exports = Joi.object({
  account_id: Joi.number().required(),
  shipment: Joi.boolean().required(),
  reference: Joi.string(),
  delivery_id: Joi.number().integer().min(1)
}).min(2).max(4);