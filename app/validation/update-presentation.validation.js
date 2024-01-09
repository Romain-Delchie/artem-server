const Joi = require('joi');

module.exports = Joi.object({
    id: Joi.number().integer().min(1),
    title: Joi.string(),
    paragraph: Joi.string()
}).min(2).max(3);