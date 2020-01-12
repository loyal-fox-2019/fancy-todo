const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const Authorization = require('../middlewares/Authorization')

router.get('/:id/todos', Authorization, TodoController.findAll)
router.post('/:id/todos', Authorization, TodoController.create)
router.get('/:id/todos/:todoId', Authorization, TodoController.findOne)
router.put('/:id/todos/:todoId', Authorization, TodoController.update)

router.patch('/:id/todos/:todoId', Authorization, TodoController.updateStatus)

router.delete('/:id/todos/:todoId', Authorization, TodoController.delete)

module.exports = router