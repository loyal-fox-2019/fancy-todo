const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todo')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authenticate)
router.get('/', TodoController.findAll)
router.post('/', TodoController.create)
router.patch('/', authorization, TodoController.patch)
router.delete('/:todoId', authorization, TodoController.delete)

module.exports = router