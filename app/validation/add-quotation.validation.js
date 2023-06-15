const Joi = require('joi');

module.exports = Joi.object({
  account_id: Joi.number().required(),
  shipment: Joi.boolean().required(),
  reference: Joi.string()
}).min(2);