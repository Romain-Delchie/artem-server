const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+_\-/;.,!])[A-Za-z\d@$!%*?&+_\-/;.,!]{8,}$/
).required(),
  repeat_password: Joi.ref('password'),
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  billing_address_id: Joi.number().integer().strict().required(),
  delivery_standard_id: Joi.number().integer().strict().required(),
  company: Joi.string().required(),
  country: Joi.string().required(),
  siret: Joi.string().pattern(/^[0-9]{14}$/).required(),
  profile_id: Joi.number().integer().strict().required(),
  phone_number: Joi.string().pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/).required()
})
