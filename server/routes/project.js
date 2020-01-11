const router = require('express').Router(),
  ProjectController = require('../controllers/project')

router.get('/', ProjectController.all)
router.post('/', ProjectController.create)
router.patch('/:id/addMember', ProjectController.addMember)
router.post('/:id/addTodo', ProjectController.addTodo)

module.exports = router