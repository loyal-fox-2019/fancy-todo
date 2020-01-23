const router = require('express').Router()
const TodoController = require('../controllers/todo')
const Authenticate = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

// add todo
router.post('/',Authenticate, TodoController.create)
router.patch('/:id',Authenticate, Authorization, TodoController.updateStatus)
router.delete('/:id',Authenticate, Authorization, TodoController.deleteTodo)

// get all todo
router.get('/',Authenticate, TodoController.getAll)
router.get('/:id',Authenticate, TodoController.getSingleTodo)

module.exports = router