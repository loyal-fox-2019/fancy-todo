const routes = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const {authentication, projectAuthorization, projectOwnerAuthorization, joinProjectAuthentication} = require('../middlewares/auth')

routes.use(authentication)
routes.post('/', ProjectController.create)
routes.get('/', ProjectController.read)
routes.get('/:id', projectAuthorization, ProjectController.readOne)
routes.patch('/user_join', joinProjectAuthentication, ProjectController.userJoinProject)
routes.patch('/remove_user/:id', projectOwnerAuthorization, ProjectController.removeUser)
routes.patch('/add_todo/:id', projectAuthorization, ProjectController.addTodoToProject)
routes.patch('/remove_todo/:id', projectAuthorization, ProjectController.removeTodo)
routes.patch('/:id', projectOwnerAuthorization, ProjectController.updateOne)
routes.post('/:id', projectOwnerAuthorization, ProjectController.generateProjectToken)
routes.delete('/:id', projectOwnerAuthorization, ProjectController.deleteOne)

module.exports = routes