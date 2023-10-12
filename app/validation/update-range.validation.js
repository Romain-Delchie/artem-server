const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  coeff: Joi.number(),
  image_link: Joi.string(),
  id: Joi.number().integer().min(1)
}).min(2);