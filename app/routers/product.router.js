const express = require('express');
const productControler = require('../controllers/product.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addProductSchema = require('../validation/add-product.validation');
const updateProductSchema = require('../validation/update-product.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const productRouter = express.Router();

productRouter.route('/')
/**
  * GET /product
  * @tags Product
  * @typedef {object} product
  * @summary Renvoi tous les produits
  * @return {[product]} 200 - products Un tableau de produits
  */
  .get(authMiddleware.checkToken, controllerWrapper(productControler.getProducts))
/**
 * POST /product
 * @tags Product
 * @summary crait un produit
 * @param {string} body.reference.required - référence du produit
 * @param {string} body.name.required - nom du produit
 * @param {string} body.designation.required - désignation du produit
 * @param {string} body.description.required - description du produit
 * @param {string} body.image_link.required - lien d'image du produit
 * @param {string} body.brand.required - marque compatible du produit
 * @param {number} body.price.required - prix de vente du produit
 * @param {number} body.unit.required - unité de vente du produit
 * @param {number} body.weight.required - poids du produit
 * @param {string} body.delivery_time.required - délai de production du produit
 * @param {boolean} body.stock.required - produit en stock ou non
 * @param {number} body.range_id.required - id de la gamme du produit
 * @return {product} 201 - product : Le produit créé
 * @return {object} 400 - erreur de validation des données en entrée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour créer ce produit
 */
  .post(validate(addProductSchema, 'body'), controllerWrapper(productControler.addProduct));

productRouter.route('/:id(\\d+)')
/**
 * GET /product/{id}
 * @summary Renvoi le produit correspondant à l'id
 * @tags Product
 * @param {number} query.id.required - id du produit
 * @return {[produit]} 200 - product : Le produit recherché
 */
  .get(controllerWrapper(productControler.getOneProduct))
/**
 * PATCH /product/{id}
 * @tags Product
 * @summary Met à jour le produit correspondant à l'id
 * @param {number} query.id.required - id du produit
 * @param {string} body.reference - optionnel référence du produit
 * @param {string} body.name - optionnel nom du produit
 * @param {string} body.designation - optionnel désignation du produit
 * @param {string} body.description - optionnel description du produit
 * @param {string} body.image_link - optionnel lien d'image du produit
 * @param {string} body.brand - optionnel marque compatible du produit
 * @param {number} body.price - optionnel prix de vente du produit
 * @param {number} body.unit - optionnel unité de vente du produit
 * @param {number} body.weight - optionnel poids du produit
 * @param {string} body.delivery_time - optionnel délai de production du produit
 * @param {boolean} body.stock - optionnel produit en stock ou non
 * @param {number} body.range_id - optionnel id de la gamme du produit
 * @return {product} 200 - Le produit modifié
 * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier ce produit
 */
  .patch(validate(updateProductSchema, 'body'), controllerWrapper(productControler.patchproduct))

  /**
 * DELETE /product/{id}
 * @tags Product
 * @summary supprime un produit
 * @param {number} query.id.required - id du produit
 * @return {object} 204 - Le produit a été supprimé
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer ce produit
 */
  .delete(controllerWrapper(productControler.deleteProduct));

module.exports = productRouter;