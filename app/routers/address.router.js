const express = require('express');
const addressController = require('../controllers/address.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addressSchema = require('../validation/address.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const addressRouter = express.Router();

addressRouter.route('/')
  /**
    * GET /address
    * @tags Delivery
    * @typedef {object} address
    * @summary Renvoi toutes les adresses
    * @return {[address]} 200 - addresses Un tableau d'adresse
    */
  .get(authMiddleware.checkToken, controllerWrapper(addressController.getAddresses))
  /**
   * POST /address
   * @tags Address
   * @summary crait une adresse
   * @param  {string} body.name_address.required - nom de l'adresse
   * @param  {string} body.street_address.required - La rue de l'adresse
   * @param  {string} body.street_other - Le complement d'adresse
   * @param  {string} body.zip_code.required - Le code postal de l'adresse
   * @param  {string} body.city.required - La ville de l'adresse
   * @return {address} 201 - address : l'adresse créée
   * @return {object} 400 - erreur de validation des données en entrée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour créer une adresse
   */
  .post(validate(addressSchema, 'body'), controllerWrapper(addressController.addAddress));

addressRouter.route('/:id(\\d+)')
  /**
   * GET /address/{id}
   * @summary Renvoi l'adresse d'un id donné
   * @tags Address
   * @param {number} query.id.required - id de l'adresse
   * @return {[address]} 200 - address : l'adresse
   */
  .get(controllerWrapper(addressController.getOneAddress))
  /**
   * PATCH /address/{id}
   * @tags Address
   * @summary Met à jour une adresse
   * @param  {string} body.name_address.required - nom de l'adresse
   * @param  {string} body.street_address.required - La rue de l'adresse
   * @param  {string} body.street_other - Le complement d'adresse
   * @param  {string} body.zip_code.required - Le code postal de l'adresse
   * @param  {string} body.city.required - La ville de l'adresse
   * @return {address} 200 - L'adresse a été mise à jour
   * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier cette adresse
   */
  .patch(validate(addressSchema, 'body'), controllerWrapper(addressController.patchAddress))

  /**
 * DELETE /address/{id}
 * @tags Address
 * @summary supprime une adresse
 * @param {number} query.id.required - id de l'adresse
 * @return {object} 204 - L'adresse a été supprimée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer cette adresse
 */
  .delete(controllerWrapper(addressController.deleteAddress));

module.exports = addressRouter;