const express = require('express');
const controllerWrapper = require('../utils/controller-wrapper');
const authMiddleware = require('../middlewares/auth.middleware');
const techsheetController = require('../controllers/techsheet.controller');

const techsheetRouter = express.Router();

techsheetRouter.route('/')
    .get(authMiddleware.checkToken, controllerWrapper(techsheetController.getTechsheets))
    .post(authMiddleware.checkToken, controllerWrapper(techsheetController.addTechsheet));

module.exports = techsheetRouter;