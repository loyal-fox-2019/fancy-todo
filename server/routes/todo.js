'use strict';
const router = require('express').Router();
const controller = require('../controllers/todo');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', controller.getTodos);
router.post('/', controller.createTodo);
router.patch('/:todoId/done', authorization, controller.markAsDone);
router.patch('/:todoId/undone', authorization, controller.markAsUndone);
router.put('/:todoId', authorization, controller.updateTodo);
router.delete('/:todoId', authorization, controller.removeTodo);

module.exports = router;