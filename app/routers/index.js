const express = require('express');

const Artemerror = require('../errors/artem-error');
const authRouter = require('./auth.router');
const router = express.Router();
const profileRouter = require('./profile.router');
const quotationRouter = require('./quotation.router');
const productRouter = require('./product.router');
const rangeRouter = require('./range.router');

router.get("/", (req, res) =>{
      res.send('Hello World!')
} )

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/quotation', quotationRouter);
router.use('/product', productRouter);
router.use('/range', rangeRouter);

router.use(() => {
  throw new Artemerror('API Route not found', 404);
});

module.exports = router;