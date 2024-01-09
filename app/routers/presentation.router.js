const express = require('express');
const presentationController = require('../controllers/presentation.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addPresentationSchema = require('../validation/add-presentation.validation');
const updatePresentationSchema = require('../validation/update-presentation.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const presentationRouter = express.Router();

presentationRouter.route('/')
  /**
    * GET /presentation
    * @tags Presentation
    * @typedef {object} presentation
    * @summary Renvoi tous les présentations
    * @return {[presentation]} 200 - ranges Un tableau de présentations
    */
  .get(controllerWrapper(presentationController.getPresentations))
  /**
   * POST /presentation
   * @tags Presentation
   * @summary crait une présentation
   * @param {string} body.title.required - titre de la présentation
   * @param {string} body.paragraph.required - paragraphe de la présentation
   * @return {presentation} 201 - presentation : La présentation créé
   * @return {object} 400 - erreur de validation des données en entrée
   * @return {object} 403 - L'utilisateur n'a pas les droits pour créer cette présentation
   */
  .post(authMiddleware.checkToken, validate(addPresentationSchema, 'body'), controllerWrapper(presentationController.addPresentation));

presentationRouter.route('/:id(\\d+)')
  /**
   * GET /presentation/{id}
   * @summary Renvoi la presentation correspondant à l'id
   * @tags Presentation
   * @param {number} query.id.required - id de la présentation
   * @return {[presentation]} 200 - presentation : La présentation recherchée
   */
  .get(controllerWrapper(presentationController.getOnePresentation))
  /**
   * PATCH /presentation/{id}
   * @tags Presentation
   * @summary Met à jour la présentation correspondant à l'id
   * @param {number} query.id.required - id de la présentation
   * @param {string} body.title - optionnel nom de la présentation
   * @param {string} body.paragraph - optionnel description de la présentation
   * @return {presentation} 200 - La présentation a été mise à jour
   * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier cette présentation
   */
  .patch(authMiddleware.checkToken, validate(updatePresentationSchema, 'body'), controllerWrapper(presentationController.patchPresentation))

  /**
 * DELETE /presentation/{id}
 * @tags Presentation
 * @summary supprime une gamme de produit
 * @param {number} query.id.required - id de la présentation
 * @return {object} 204 - La présentation a été supprimée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer cette présentation
 */
  .delete(authMiddleware.checkToken, controllerWrapper(presentationController.deletePresentation));

module.exports = presentationRouter;