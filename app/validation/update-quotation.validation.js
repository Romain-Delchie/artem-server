const Joi = require('joi');

module.exports = Joi.object({
  shipment: Joi.boolean(),
  reference: Joi.string(),
  id: Joi.number().integer().min(1).required(),
  delivery_id: Joi.number().integer().min(1)
}).min(2);