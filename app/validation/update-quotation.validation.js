const Joi = require('joi');

module.exports = Joi.object({
  shipment: Joi.boolean(),
  reference: Joi.string().allow(null),
  id: Joi.number().integer().min(1),
  delivery_id: Joi.number().integer().min(1),
  ordered: Joi.boolean()
}).min(1);