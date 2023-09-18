const Joi = require('joi');

module.exports = Joi.object({
    quantity: Joi.number().required(),
}).min(1);