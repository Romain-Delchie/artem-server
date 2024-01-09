const express = require('express');

const Artemerror = require('../errors/artem-error');
const authRouter = require('./auth.router');
const router = express.Router();
const accountRouter = require('./account.router');
const quotationRouter = require('./quotation.router');
const productRouter = require('./product.router');
const rangeRouter = require('./range.router');
const deliveryRouter = require('./delivery.router');
const addressRouter = require('./address.router');
const quotationHasProductRouter = require('./quotationHasProduct.router');
const emailRouter = require('./email.router');
const uploadRouter = require('./upload.router');
const techsheetRouter = require('./techsheet.router');
const rangeHasTechsheetRouter = require('./rangeHasTechsheet.router');
const presentationRouter = require('./presentation.router');

router.get("/api", (req, res) => {
  res.send('Hello World!')
})

router.use('/api/auth', authRouter);
router.use('/api/account', accountRouter);
router.use('/api/quotation', quotationRouter);
router.use('/api/product', productRouter);
router.use('/api/range', rangeRouter);
router.use('/api/delivery', deliveryRouter);
router.use('/api/address', addressRouter);
router.use('/api/quotationHasProduct', quotationHasProductRouter);
router.use('/api/email', emailRouter);
router.use('/api/upload', uploadRouter);
router.use('/api/techsheet', techsheetRouter);
router.use('/api/rangeHasTechsheet', rangeHasTechsheetRouter);
router.use('/api/presentation', presentationRouter);

router.use(() => {
  throw new Artemerror('API Route not found', 404);
});

module.exports = router;