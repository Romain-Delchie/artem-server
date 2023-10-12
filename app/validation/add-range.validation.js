const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  coeff: Joi.number().required(),
  image_link: Joi.string().required(),
}).min(5).max(5);