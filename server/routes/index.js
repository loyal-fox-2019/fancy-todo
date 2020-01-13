'use strict';

const TodoRouter = require('./TodoRouter');
const UserRouter = require('./UserRouter');
const router = require('express').Router();

router.use('/todo', TodoRouter);
router.use('/user', UserRouter);                                                                                                                                                                                         

module.exports = router;