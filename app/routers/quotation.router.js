const express = require('express');
const quotationController = require('../controllers/quotation.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addQuotationSchema = require('../validation/add-quotation.validation');
const updateQuotationSchema = require('../validation/update-quotation.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const quotationRouter = express.Router();

quotationRouter.route('/')
  /**
    * GET /quotation
    * @tags Quotation
    * @typedef {object} quotation
    * @summary Renvoi les devis de l’utilisateur connecté
    * @return {[quotation]} 200 - quotations Un tableau de devis
    */
  .get(authMiddleware.checkToken, controllerWrapper(quotationController.getQuotations))
  /**
   * POST /quotation
   * @tags Quotation
   * @summary crait un devis
   * @param {number} body.account_id.required- id de l'utilisateur concerné
   * @param {number} body.delivery_id- optionnel id de l'adresse de livraison souhaitée
   * @param {string} body.shipment.required - mode de livraison pour ce devis
   * @param {string} body.reference - optionnel référence du devis
   * @return {quotation} 201 - quotation : Le devis créé
   * @return {object} 400 - erreur de validation des données en entrée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour créer un devis sur cet utilisateur
   */
  .post(validate(addQuotationSchema, 'body'), controllerWrapper(quotationController.addQuotation));

quotationRouter.route('/:id(\\d+)')
  /**
   * GET /quotation/{id}
   * @summary Renvoi les devis propres à l'utilisateur connecté
   * @tags Quotation
   * @param {number} query.id.required - id du devis
   * @return {[quotation]} 200 - quotations Un tableau de devis
   */
  .get(controllerWrapper(quotationController.getOneQuotation))
  /**
   * PATCH /quotation/{id}
   * @tags Quotation
   * @summary Met à jour un devis
   * @param {string} body.shipment optionnel mode de livraison du devis
   * @param {number} body.delivery_id- optionnel id de l'adresse de livraison souhaitée
   * @param {string} body.reference optionnel référence du devis
   * @param {number} query.id.required - id du devis
   * @return {quotation} 200 - Le devis modifié
   * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier ce devis
   */
  .patch(validate(updateQuotationSchema, 'body'), controllerWrapper(quotationController.patchQuotation))

  /**
 * DELETE /quotation/{id}
 * @tags Quotation
 * @summary supprime un devis
 * @param {number} query.id.required - id du devis
 * @return {object} 204 - Le devis a été supprimé
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer ce devis
 */
  .delete(controllerWrapper(quotationController.deleteQuotation));




module.exports = quotationRouter;