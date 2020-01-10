const router = require('express').Router();
const user = require('./user');
const todos = require('./todo');
const project = require('./project');

router.use('/user', user);
router.use('/todos', todos);
router.use('/projects', project);

module.exports = router;
