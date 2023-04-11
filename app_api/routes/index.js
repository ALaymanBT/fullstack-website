const express = require('express');
const router = express.Router();
const tripRouter = require('./trips');
const authRouter = require('./authentication');

router.use('/trips', tripRouter);
router.use('/auth', authRouter);

module.exports = router;