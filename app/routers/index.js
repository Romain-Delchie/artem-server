const express = require('express');

const Artemerror = require('../errors/artem-error');
const authRouter = require('./auth.router');
const router = express.Router();
const {account} = require('../models/index.datamapper');

router.get("/", (req, res) =>{
      res.send('Hello World!')
} )

router.use('/auth', authRouter);

router.use(() => {
  throw new Artemerror('API Route not found', 404);
});

module.exports = router;