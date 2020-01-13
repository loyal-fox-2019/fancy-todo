const routes = require('express').Router()
const controllerUser = require('../controllers/controlUser')
const controllerTodo = require('../controllers/controlTodo')
const authentication = require('../helpers/middlewares/Authentication')
const authorization = require('../helpers/Authorization')

routes.post('/gSignIn', controllerUser.google)
routes.post('/register', controllerUser.register)
routes.post('/login', controllerUser.login)
routes.get('/', authentication, controllerTodo.findAllMyTodo)
routes.post('/create', authentication, authorization.toCreate, controllerTodo.createTodo)
routes.put('/update/:id', authentication, authorization.toUpdateOrDelete, controllerTodo.updateTodo)
routes.delete('/delete/:id', authentication, authorization.toUpdateOrDelete, controllerTodo.deleteTodo)
routes.get('/getWeather', authentication, controllerTodo.getWeather)
routes.get('/users/:username', authentication, controllerTodo.findByusername)


module.exports = routes