const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image_link: Joi.string().required(),
}).min(3).max(3);