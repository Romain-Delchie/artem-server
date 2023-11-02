const Joi = require('joi');

module.exports = Joi.object({
  coeff: Joi.number().precision(2).required(),
  reference: Joi.string().required(),
  active: Joi.boolean().required(),
  name: Joi.string().required(),
  designation: Joi.string().required(),
  description: Joi.string().required(),
  image_link: Joi.string().required(),
  brand: Joi.string().required(),
  length: Joi.number().integer().required(),
  width: Joi.number().integer().required(),
  price: Joi.number().precision(2).required(),
  unit: Joi.number().required(),
  weight: Joi.number().precision(2).required(),
  delivery_time: Joi.string().required(),
  stock: Joi.boolean().required(),
  range_id: Joi.number().integer().required()
}).min(16);