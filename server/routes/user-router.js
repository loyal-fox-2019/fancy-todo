const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const ProjectController = require('../controllers/project-controller')

router.get('/', UserController.getAllUsers)
router.get('/projects', ProjectController.getProject)
router.post('/projects', ProjectController.createProject)
router.get('/todos', UserController.getUserTodos)
router.post('/todos', UserController.createTodo)
router.patch('/todos/:todoId', UserController.editTodo)
router.delete('/todos/:todoId', UserController.deleteTodo)

module.exports = router
