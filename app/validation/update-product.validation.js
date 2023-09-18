const Joi = require('joi');

module.exports = Joi.object({
  reference: Joi.string(),
  name: Joi.string(),
  designation: Joi.string(),
  description: Joi.string(),
  image_link: Joi.string(),
  brand: Joi.string(),
  price: Joi.number().precision(2),
  unit: Joi.number(),
  weight: Joi.number().precision(2),
  delivery_time: Joi.string(),
  stock: Joi.boolean(),
  range_id: Joi.number().integer(),
  id: Joi.number().integer().min(1)
}).min(2);