const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const oauth = require('./oauth');
const user = require('./user');
const todo = require('./todo');
const status = require('./status');
const project = require('./project');
const authentication = require('../middlewares/authentication');

router.use('/oauth', oauth);
router.use('/user', user);

router.use('/', authentication);
router.use('/todo', todo);
router.use('/status', status);
router.use('/projects', project);
router.use(errorHandler);

module.exports = router