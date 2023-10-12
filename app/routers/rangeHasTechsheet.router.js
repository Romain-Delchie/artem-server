const express = require('express');
const controllerWrapper = require('../utils/controller-wrapper');
const authMiddleware = require('../middlewares/auth.middleware');
const rangeHasTechsheetController = require('../controllers/rangeHasTechsheet.controller');

const rangeHasTechsheetRouter = express.Router();

rangeHasTechsheetRouter.route('/')
    .get(authMiddleware.checkToken, controllerWrapper(rangeHasTechsheetController.getRangeHasTechsheets))
    .post(authMiddleware.checkToken, controllerWrapper(rangeHasTechsheetController.addRangeHasTechsheet))
    .delete(authMiddleware.checkToken, controllerWrapper(rangeHasTechsheetController.deleteRangeHasTechsheet));

module.exports = rangeHasTechsheetRouter;