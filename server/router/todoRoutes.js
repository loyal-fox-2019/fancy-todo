const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use('/',authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.allTodo)
// router.use('/', authorization)
router.get('/:todoId',authorization, TodoController.getOneTodo)
router.get('/search/:todoTitle',authorization, TodoController.getOneTitle)
router.patch('/:todoId',authorization, TodoController.updateWhole)
// router.put('/:todoId', TodoController.updateSpecific)
router.delete('/:todoId',authorization, TodoController.deleteTodo)

module.exports = router