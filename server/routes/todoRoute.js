const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use(authenticate)
router.get('/', TodoController.showNonProjectTodo)
router.get('/:projectId', TodoController.showProjectTodo)
router.post('/', TodoController.create)

router.use('/:id', authorize)
router.patch('/:id', TodoController.edit)
router.delete('/:id', TodoController.remove)

module.exports = router