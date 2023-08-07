const express = require('express');
const quotationHasProductController = require('../controllers/quotationHasProduct.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addQuotationHasProductSchema = require('../validation/add-quotationHasProduct.validation');
const updateQuotationHasProductSchema = require('../validation/update-quotationHasProduct.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const quotationHasProductRouter = express.Router();

quotationHasProductRouter.route('/')
  /**
    * GET /quotationHasProduct
    * @tags QuotationHasProduct
    * @typedef {object} quotationHasProduct
    * @summary Renvoi les produits de tous les devis
    * @return {[quotationHasProduct]} 200 - quotationHasProduct Un tableau de produits
    */
  .get(authMiddleware.checkToken, controllerWrapper(quotationHasProductController.getQuotationHasProduct))
  /**
   * POST /quotationHasProduct
   * @tags QuotationHasProduct
   * @summary ajoute un produit à un devis
   * @param {number} body.quotation_id.required- id du devis concerné
   * @param {number} body.product_id.required- id du produit concerné
   * @param {number} body.quantity.required - quantité du produit
   * @return {quotationHasProduct} 201 - quotationHasProduct : Le produit ajouté au devis
   * @return {object} 400 - erreur de validation des données en entrée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour ajouter un produit à ce devis
   */
  .post(validate(addQuotationHasProductSchema, 'body'), controllerWrapper(quotationHasProductController.addQuotationHasProduct));

quotationHasProductRouter.route('/:id(\\d+)')
  /**
   * GET /quotationHasProduct/{id}
   * @summary Renvoi les produits d'un devis
   * @tags QuotationHasProduct
   * @param {number} query.id.required - id du devis
   * @return {[quotation]} 200 - quotations Un tableau de devis
   */
  .get(authMiddleware.checkToken, controllerWrapper(quotationHasProductController.getProductsFromQuotation))
  /**
   * PATCH /quotationHasProduct/{id}
   * @tags QuotationHasProduct
   * @summary Met à jour un prduit d'un devis
   * @param {string} body.quantity quantité du produit
   * @param {number} query.id.required - id de la ligne de devis
   * @return {quotationHasProduct} 200 - La ligne de devis modifiée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier ce devis
   */
  .patch(authMiddleware.checkToken, validate(updateQuotationHasProductSchema, 'body'), controllerWrapper(quotationHasProductController.patchQuotationHasProduct))

  /**
 * DELETE /quotationHasProduct/{id}
 * @tags QuotationHasProduct
 * @summary supprime une ligne d'un devis
 * @param {number} query.id.required - id de la ligne du devis
 * @return {object} 204 - La ligne du devis a été supprimé
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer ce devis
 */
  .delete(authMiddleware.checkToken, controllerWrapper(quotationHasProductController.deleteQuotationHasProduct));




module.exports = quotationHasProductRouter;