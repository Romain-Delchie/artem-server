const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  image_link: Joi.string(),
  id: Joi.number().integer().min(1).required()
}).min(2);