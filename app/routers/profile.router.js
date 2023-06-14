const express = require('express');
const profilControler = require('../controllers/profile.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const updateProfileSchema = require('../validation/update-profile.validation');

const profileRouter = express.Router();

profileRouter.route('/')
/**
 * GET /profile
 * @tags Profile
 * @typedef {object} account
 * @summary Renvoi les données du compte de l’utilisateur connecté
 * @return {account} 200 - Les données du compte de l’utilisateur connecté
 * @return {object} 404 - L'utilisateur n'a pas été trouvé
 */
  .get(authMiddleware.checkToken, controllerWrapper(profilControler.getProfile))
  /**
  * PATCH /profile
  * @tags Profile
  * @summary Mise à jour des données du compte de l’utilisateur connecté
  * @param {string} body.email optionnel - email de l'utilisateur
  * @param {string} body.company optionnel - entreprise de l'utilisateur
  * @param {string} body.password optionnel - mot de passe de l'utilisateur
  * @param {string} body.repeat_password optionnel - confirmation mot de passe de l'utilisateur
  * @param {string} body.firstname optionnel - prénom de l'utilisateur
  * @param {string} body.lastname optionnel - nom de l'utilisateur
  * @param {string} body.invoice_address optionnel - adresse de l'utilisateur
  * @param {string} body.phone_number optionnel - téléphone de l'utilisateur
  * @return {account} 200 - Les données du compte de l’utilisateur après modification
  * @return {object} 400 - Erreur de validation des données en entrée
  */
  .patch(authMiddleware.checkToken, validate(updateProfileSchema, 'body'), controllerWrapper(profilControler.updateProfile))
  /**
  *DELETE /profile
  * @tags Profile
  * @summary Suppression du compte de l’utilisateur connecté
  * @return {object} 204 - Compte supprimé
  * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer ce compte
  */    
  .delete(authMiddleware.checkToken, controllerWrapper(profilControler.deleteProfile));

module.exports = profileRouter;