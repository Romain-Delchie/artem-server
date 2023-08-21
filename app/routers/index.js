const express = require('express');

const Artemerror = require('../errors/artem-error');
const authRouter = require('./auth.router');
const router = express.Router();
const accountRouter = require('./account.router');
const quotationRouter = require('./quotation.router');
const productRouter = require('./product.router');
const rangeRouter = require('./range.router');
const deliveryRouter = require('./delivery.router');
const quotationHasProductRouter = require('./quotationHasProduct.router');
const emailOrderRouter = require('./emailOrder.router');

router.get("/", (req, res) => {
  res.send('Hello World!')
})

router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/quotation', quotationRouter);
router.use('/product', productRouter);
router.use('/range', rangeRouter);
router.use('/delivery', deliveryRouter);
router.use('/quotationHasProduct', quotationHasProductRouter);
router.use('/email-order', emailOrderRouter);

router.use(() => {
  throw new Artemerror('API Route not found', 404);
});

module.exports = router;