const routes = require('express').Router()
const TodoController = require('../controllers/TodoController')
const {authentication, authorization} = require('../middlewares/auth')

routes.use(authentication)
routes.post('/', TodoController.create)
routes.get('/', TodoController.find)
routes.get('/free', TodoController.readFreeTodos)
routes.get('/:id', authorization, TodoController.findOne)
routes.patch('/:id', authorization, TodoController.updateOne)
routes.delete('/:id', authorization, TodoController.deleteOne)

module.exports = routes