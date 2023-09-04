const express = require('express');
const deliveryController = require('../controllers/delivery.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const deliverySchema = require('../validation/delivery.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const deliveryRouter = express.Router();

deliveryRouter.route('/')
  /**
    * GET /delivery
    * @tags Delivery
    * @typedef {object} delivery
    * @summary Renvoi les adresse de livraison de l’utilisateur connecté
    * @return {[delivery]} 200 - deliveries Un tableau d'adresse de livraison
    */
  .get(authMiddleware.checkToken, controllerWrapper(deliveryController.getDeliveries))
  /**
   * POST /delivery
   * @tags Delivery
   * @summary crait une adresse de livraison
   * @param {number} body.account_id.required- id de l'utilisateur concerné
   * @param {number} body.delivery_address_id.required - id de l'adresse de livraison
   * @return {delivery} 201 - delivery : l'adresse de livraison créée
   * @return {object} 400 - erreur de validation des données en entrée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour créer une adresse de livraison
   */
  .post(authMiddleware.checkToken, validate(deliverySchema, 'body'), controllerWrapper(deliveryController.addDelivery));

deliveryRouter.route('/:id(\\d+)')
  /**
   * GET /delivery/{id}
   * @summary Renvoi l'adresse de livraison d'un id donné
   * @tags Delivery
   * @param {number} query.id.required - id de l'adresse de livraison
   * @return {[delivery]} 200 - delivery : l'adresse de livraison
   */
  .get(controllerWrapper(deliveryController.getOneDelivery))
  /**
 * DELETE /delivery/{id}
 * @tags Delivery
 * @summary supprime une adresse de livraison
 * @param {number} query.id.required - id de l'adresse de livraison
 * @return {object} 204 - L'adresse de livraison a été supprimée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer cette adresse de livraison
 */
  .delete(authMiddleware.checkToken, controllerWrapper(deliveryController.deleteDelivery));

module.exports = deliveryRouter;