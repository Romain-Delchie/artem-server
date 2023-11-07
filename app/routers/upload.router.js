const express = require('express');
const uploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const uploadRouter = express.Router();

uploadRouter.route('/image').post(authMiddleware.checkToken, uploadController.uploadImage);

uploadRouter.route('/pdf').post(authMiddleware.checkToken, uploadController.uploadPdf);
uploadRouter.route('/pdf/:filename').delete(authMiddleware.checkToken, uploadController.deletePdf);


module.exports = uploadRouter;