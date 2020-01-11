const routes = require('express').Router()
const controllerUser = require('../controllers/controlUser')
const controllerTodo = require('../controllers/controlTodo')
const authentication = require('../helpers/middlewares/Authentication')

routes.post('/register', controllerUser.register)
routes.post('/login', controllerUser.login)
routes.get('/', authentication, controllerTodo.findAllMyTodo)
routes.post('/create', authentication, controllerTodo.createTodo)
routes.put('/update/:id', authentication, controllerTodo.updateTodo)
routes.delete('/delete/:id', authentication, controllerTodo.deleteTodo)


module.exports = routes