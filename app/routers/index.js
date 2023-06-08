const express = require('express');

const Artemerror = require('../errors/artem-error');

const router = express.Router();

router.get("/", (req, res) =>{
    res.send('Hello World!')
} )
router.use(() => {
  throw new Artemerror('API Route not found', 404);
});

module.exports = router;