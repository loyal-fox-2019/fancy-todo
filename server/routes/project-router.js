const router = require('express').Router()
const ProjectController = require('../controllers/project-controller')
const { projectOwnerAuth, projectAuth } = require('../middlewares/project-auth')

router.patch('/:projectId', projectOwnerAuth, ProjectController.editProject)
router.delete('/:projectId', projectOwnerAuth, ProjectController.deleteProject)
router.post('/:projectId/todos', projectAuth, ProjectController.addTodoProject)
router.patch(
  '/:projectId/todos/:todoId',
  projectAuth,
  ProjectController.editTodoProject,
)
router.delete(
  '/:projectId/todos/:todoId',
  projectAuth,
  ProjectController.deleteTodoProject,
)
router.post(
  '/:projectId/members',
  projectOwnerAuth,
  ProjectController.addMember,
)
router.delete(
  '/:projectId/members/:memberId',
  projectOwnerAuth,
  ProjectController.kickMember,
)

module.exports = router
