const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .email(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/),
  repeat_password: Joi.ref('password'),
  lastname: Joi.string(),
  firstname: Joi.string(),
  idToValidate: Joi.number().integer(),
  billing_address_id: Joi.number().integer(),
  delivery_standard_id: Joi.number().integer(),
  siret: Joi.string().pattern(/^[0-9]{14}$/),
  role: Joi.string().valid('admin', 'user'),
  profile_id: Joi.number().integer(),
  company: Joi.string(),
  phone_number: Joi.string().pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
}).min(1).with('password', 'repeat_password');