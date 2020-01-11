const router = require('express').Router(),
  ProjectController = require('../controllers/project'),
  { authorize, authorizeProject } = require('../middlewares/auth')

router.get('/', ProjectController.all)
router.post('/', ProjectController.create)
router.get('/:id', authorize,ProjectController.getTodo)
router.patch('/:id/addMember', authorize, ProjectController.addMember)
router.post('/:id/addTodo', authorize, ProjectController.addTodo)
router.delete('/:id', authorizeProject, ProjectController.destroy)

module.exports = router