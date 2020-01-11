const router = require('express').Router()
const TodoController = require('../controllers/todo')

// add todo
router.post('/', TodoController.create)
router.patch('/:id', TodoController.updateStatus)
router.put('/:id', TodoController.update)

// get all todo
router.get('/:user_id', TodoController.getAll)

module.exports = router