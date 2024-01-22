const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image_link: Joi.string().required(),
  category: Joi.string().required(),
  minPrice: Joi.number().precision(2).required(),
  searchFilter: Joi.boolean().required(),
}).min(6).max(6);