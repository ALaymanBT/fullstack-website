const express = require('express');
const router = express.Router();
const tripRouter = require('./trips');

router.use('/trips', tripRouter);

module.exports = router;