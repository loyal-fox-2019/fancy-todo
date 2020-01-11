const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const oauth = require('./oauth');
const user = require('./user');

router.use('/oauth', oauth);
router.use('/user', user);
router.use(errorHandler);

module.exports = router