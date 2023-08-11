const Joi = require('joi');

module.exports = Joi.object({
    quotation_id: Joi.number().required(),
    product_id: Joi.number().required(),
    quantity: Joi.number().required(),

}).required(3);