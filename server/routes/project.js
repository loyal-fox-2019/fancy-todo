const router = require('express').Router(),
  ProjectController = require('../controllers/project'),
  { authorize, authorizeProject } = require('../middlewares/auth')

router.get('/', ProjectController.all)
router.post('/', ProjectController.create)
router.get('/:id',ProjectController.getTodo)
router.patch('/:id/addMember', ProjectController.addMember)
router.post('/:id/addTodo', ProjectController.addTodo)
router.delete('/:id', authorizeProject, ProjectController.destroy)

module.exports = router