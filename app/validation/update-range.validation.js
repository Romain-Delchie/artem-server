const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  minPrice: Joi.number().precision(2),
  image_link: Joi.string(),
  id: Joi.number().integer().min(1),
  searchFilter: Joi.boolean(),
}).min(2);