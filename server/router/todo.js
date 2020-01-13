'use strict';

var express = require('express');
var router = express.Router();

const TodoController = require('../controllers/todoController');
const authenticate = require('../middlewares/auth');

// router.get('/token', TodoController.token);

router.use(authenticate);
router.get('/', TodoController.findAll);
router.post('/', TodoController.create);
router.delete('/:id', TodoController.delete);
router.patch('/:id', TodoController.update);

module.exports = router;
