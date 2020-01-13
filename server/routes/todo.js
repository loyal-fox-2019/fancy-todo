const router = require('express').Router(),
  TodoController = require('../controllers/todo'),
  { authorize } = require('../middlewares/auth')

router.get('/', TodoController.all)
router.post('/', TodoController.create)
router.delete('/:id', authorize, TodoController.remove)
router.patch('/:id/done', authorize, TodoController.done)

module.exports = router