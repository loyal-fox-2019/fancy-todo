const routes = require('express').Router()
const UserController = require('../controllers/UserController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.delete('/:id', UserController.deleteOne)

module.exports = routes