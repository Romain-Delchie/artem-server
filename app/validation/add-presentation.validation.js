const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    paragraph: Joi.string().required()
}).min(2).max(2);