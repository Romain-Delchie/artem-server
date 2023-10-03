const express = require('express');
const authController = require('../controllers/auth.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const signinSchema = require('../validation/signin.validation');
const registerSchema = require('../validation/register.validation');

const authRouter = express.Router();

/**
   * POST /auth/signin
   * @typedef {String} JWT
   * @tags Authentification
   * @summary Connexion d'un utilisateur
   * @param {string} body.email.required email de l'utilisateur
   * @param {string} body.password.required mot de passe de l'utilisateur
   * @return {JWT} 200 - Token d'authentification
   * @return {string} 401 - Identifiants invalides
   */
authRouter.post('/signin', validate(signinSchema, 'body'), controllerWrapper(authController.signin));

/**
   * POST /auth/register
   * @typedef {Object} account
   * @tags Authentification
   * @summary Inscription d'un utilisateur
   * @param {string} body.email.required - email de l'utilisateur
   * @param {string} body.company.required - entreprise de l'utilisateur
   * @param {string} body.password.required  - mot de passe de l'utilisateur
   * @param {string} body.repeat_password.required  - confirmation mot de passe de l'utilisateur
   * @param {string} body.firstname.required  - prénom de l'utilisateur
   * @param {string} body.lastname.required  - nom de l'utilisateur
   * @param {string} body.invoice_address.required  - adresse de l'utilisateur
   * @param {string} body.role.required  - rôle de l'utilisateur (vétérinaire ou propriétaire)
   * @param {string} body.phone_number optionnel - téléphone de l'utilisateur
   * @return {account} 200 - Compte utilisateur créé
   * @return {object} 400 - Erreur de validation
   * @return {object} 400 - Un utilisateur avec cet email existe déjà
   */
authRouter.post('/register', validate(registerSchema, 'body'), controllerWrapper(authController.register));

authRouter.post('/refresh-token', controllerWrapper(authController.refreshToken));

module.exports = authRouter;