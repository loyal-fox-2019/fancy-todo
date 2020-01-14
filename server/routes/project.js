const router = require('express').Router(),
  ProjectController = require('../controllers/project'),
  { authorizeMember, authorizeProject } = require('../middlewares/auth')

router.get('/', ProjectController.all)
router.post('/', ProjectController.create)
router.get('/:id',ProjectController.getTodo)
router.patch('/:id/addMember', authorizeMember, ProjectController.addMember)
router.post('/:id/addTodo', authorizeMember, ProjectController.addTodo)
router.delete('/:id', authorizeProject, ProjectController.destroy)

module.exports = router