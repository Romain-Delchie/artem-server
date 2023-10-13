const Joi = require('joi');

module.exports = Joi.object({
    name_address: Joi.string().required(),
    street_address: Joi.string().required(),
    zip_code: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
}).min(5).max(5);