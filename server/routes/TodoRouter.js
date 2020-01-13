'use strict';

const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const { authentication, authorizeTodo } = require('../middlewares/auth');

// router.use(authentication);
// router.use(authorizeTodo);
router.get('/', TodoController.find);
router.post('/', TodoController.create);
router.delete('/:id', TodoController.deleteOne);
router.put('/:id', TodoController.update);

module.exports = router;