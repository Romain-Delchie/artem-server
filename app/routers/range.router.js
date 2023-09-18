const express = require('express');
const rangeController = require('../controllers/range.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addRangeSchema = require('../validation/add-range.validation');
const updateRangeSchema = require('../validation/update-range.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const rangeRouter = express.Router();

rangeRouter.route('/')
  /**
    * GET /range
    * @tags Range
    * @typedef {object} range
    * @summary Renvoi tous les gammes de produit
    * @return {[range]} 200 - ranges Un tableau des gammes de produit
    */
  .get(controllerWrapper(rangeController.getRanges))
  /**
   * POST /range
   * @tags Range
   * @summary crait une gamme de produit
   * @param {string} body.name.required - nom de la gamme
   * @param {string} body.description.required - description de la gamme
   * @param {string} body.image_link.required - lien d'image de la gamme
   * @return {range} 201 - range : La gamme créé
   * @return {object} 400 - erreur de validation des données en entrée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour créer cette gamme
   */
  .post(validate(addRangeSchema, 'body'), controllerWrapper(rangeController.addRange));

rangeRouter.route('/:id(\\d+)')
  /**
   * GET /range/{id}
   * @summary Renvoi la gamme correspondant à l'id
   * @tags Range
   * @param {number} query.id.required - id de la gamme
   * @return {[range]} 200 - range : La gamme recherchée
   */
  .get(controllerWrapper(rangeController.getOneRange))
  /**
   * PATCH /range/{id}
   * @tags Range
   * @summary Met à jour la gamme correspondant à l'id
   * @param {number} query.id.required - id de la gamme
   * @param {string} body.name - optionnel nom de la gamme
   * @param {string} body.description - optionnel description de la gamme
   * @param {string} body.image_link - optionnel lien d'image de la gamme
   * @return {range} 200 - La gamme a été mise à jour
   * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier cette gamme
   */
  .patch(validate(updateRangeSchema, 'body'), controllerWrapper(rangeController.patchRange))

  /**
 * DELETE /range/{id}
 * @tags Range
 * @summary supprime une gamme de produit
 * @param {number} query.id.required - id de la gamme
 * @return {object} 204 - La gamme a été supprimée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer cette gamme
 */
  .delete(controllerWrapper(rangeController.deleteRange));

module.exports = rangeRouter;