const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const oauth = require('./oauth');

router.use('/oauth', oauth);
router.use(errorHandler);

module.exports = router