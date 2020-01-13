const express = require('express');
const router = express.Router();
const routerTodo = require('./routerTodo');
const routerUser = require('./routerUser');
const routerProject = require('./routerProject');

router.use('/api/todos', routerTodo);
router.use('/api/users', routerUser);
router.use('/api/projects', routerProject);

module.exports = router;