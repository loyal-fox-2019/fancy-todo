const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const { authenticate } = require('../middlewares/authenticate')
const { authorizeProject } = require('../middlewares/authorization')

router.use(authenticate)

router.post('/', ProjectController.create)
router.get('/', ProjectController.getAll)
router.get('/:id', authorizeProject, ProjectController.getOne)
router.put('/:id', authorizeProject, ProjectController.updateDetail)
router.patch('/:id/members/:userid', authorizeProject, ProjectController.addMember)
router.delete('/:id', authorizeProject, ProjectController.delete)

router.post('/:id/todos', authorizeProject, ProjectController.createTodo)
router.put('/:id/todos/:todoId', authorizeProject, ProjectController.updateDetailTodo)
router.patch('/:id/todos/:todoId', authorizeProject, ProjectController.updateStatusTodo)
router.delete('/:id/todos/:todoId', authorizeProject, ProjectController.deleteTodo)


module.exports =router