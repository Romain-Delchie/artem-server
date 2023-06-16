const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .email(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/),
  repeat_password: Joi.ref('password'),
  lastname: Joi.string(),
  firstname: Joi.string(),
  invoice_address: Joi.string(),
  company: Joi.string(),
  phone_number: Joi.string().pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/),
  id: Joi.number().integer().min(1).required()
}).min(1).with('password', 'repeat_password');