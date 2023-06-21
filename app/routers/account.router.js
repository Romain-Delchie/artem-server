const express = require('express');
const accountController = require('../controllers/account.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const updateAccountSchema = require('../validation/update-account.validation');
const addAccountSchema = require('../validation/add-account.validation');
const authController = require('../controllers/auth.controller');

const accountRouter = express.Router();

accountRouter.route('/')
/**
 * GET /account
 * @tags Account
 * @typedef {object} account
 * @summary Renvoi les données du compte de l’utilisateur connecté
 * @return {account} 200 - Les données du compte de l’utilisateur connecté
 * @return {object} 404 - L'utilisateur n'a pas été trouvé
 */
  .get(authMiddleware.checkToken, controllerWrapper(accountController.getAccount))
  /**
 * POST /account
 * @tags Account
 * @summary crait un compte
 * @param {string} body.email.required - email de l'utilisateur
 * @param {string} body.company.required - entreprise de l'utilisateur
 * @param {string} body.firstname.required - prénom de l'utilisateur
 * @param {string} body.lastname.required - nom de l'utilisateur
 * @param {string} body.phone_number.required - téléphone de l'utilisateur
 * @param {string} body.password.required - mot de passe de l'utilisateur
 * @param {string} body.invoice_address.required - adresse de l'utilisateur
 * @param {string} body.role.required - role de l'utilisateur
 * @param {number} body.profile_id.required - id du profil
 * @return {product} 201 - account : le compte créé
 * @return {object} 400 - erreur de validation des données en entrée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour créer un compte
 */
  .post(validate(addAccountSchema, 'body'), controllerWrapper(authController.register))
  /**
  * PATCH /account
  * @tags Account
  * @summary Mise à jour des données du compte de l’utilisateur connecté
  * @param {string} body.email optionnel - email de l'utilisateur
  * @param {string} body.company optionnel - entreprise de l'utilisateur
  * @param {string} body.password optionnel - mot de passe de l'utilisateur
  * @param {string} body.repeat_password optionnel - confirmation mot de passe de l'utilisateur
  * @param {string} body.firstname optionnel - prénom de l'utilisateur
  * @param {string} body.lastname optionnel - nom de l'utilisateur
  * @param {string} body.invoice_address optionnel - adresse de l'utilisateur
  * @param {string} body.phone_number optionnel - téléphone de l'utilisateur
  * @param {number} body.profile_id optionnel - id du profil
  * @return {account} 200 - Les données du compte de l’utilisateur après modification
  * @return {object} 400 - Erreur de validation des données en entrée
  */
  .patch(authMiddleware.checkToken, validate(updateAccountSchema, 'body'), controllerWrapper(accountController.updateAccount))
  /**
  *DELETE /account
  * @tags Account
  * @summary Suppression du compte de l’utilisateur connecté
  * @return {object} 204 - Compte supprimé
  * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer ce compte
  */    
  .delete(authMiddleware.checkToken, controllerWrapper(accountController.deleteAccount));

module.exports = accountRouter;