const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authenticate } = require('../middlewares/authenticate')
const { authorizeTodo } = require('../middlewares/authorization')

router.use(authenticate)
router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.get('/:id', authorizeTodo, TodoController.getOne)
router.put('/:id', authorizeTodo, TodoController.updateDetail)
router.patch('/:id', authorizeTodo, TodoController.updateStatus)
router.delete('/:id', authorizeTodo, TodoController.delete)

module.exports = router