const router = require('express').Router()
const TodoController = require('../controllers/todo')
const Authenticate = require('../middlewares/authentication')

// add todo
router.post('/',Authenticate, TodoController.create)
router.patch('/:id',Authenticate, TodoController.updateStatus)
router.delete('/:id',Authenticate, TodoController.deleteTodo)

// get all todo
router.get('/',Authenticate, TodoController.getAll)
router.get('/:id',Authenticate, TodoController.getSingleTodo)

module.exports = router