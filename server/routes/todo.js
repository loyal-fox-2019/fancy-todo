const router = require('express').Router()
const TodoController = require('../controllers/todo')
const Authenticate = require('../middlewares/authentication')

// add todo
router.post('/', TodoController.create)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)
router.post('/send', TodoController.sendWhatsapp)

// get all todo
router.get('/:id', TodoController.getAll)
router.get('/:id', TodoController.getSingleTodo)

module.exports = router