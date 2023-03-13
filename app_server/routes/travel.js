const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

/* GET Travel Page */
router.get('/', ctrlTravel.travel);

module.exports = router;
