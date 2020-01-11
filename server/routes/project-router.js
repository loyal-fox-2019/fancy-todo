const router = require('express').Router()
const ProjectController = require('../controllers/project-controller')
const { projectOwnerAuth } = require('../middlewares/project-auth')

router.patch('/:projectId', projectOwnerAuth, ProjectController.editProject)
router.delete('/:projectId', projectOwnerAuth, ProjectController.deleteProject)
router.get('/todos', ProjectController.getTodoProject)
router.post('/todos', ProjectController.addTodoProject)
router.patch('/todos/:todoId', ProjectController.editTodoProject)
router.delete('/todos/:todoId', ProjectController.deleteTodoProject)

module.exports = router
