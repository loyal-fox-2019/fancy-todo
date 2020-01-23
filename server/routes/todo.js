const todoRouter = require('express').Router();

const { TodoController } = require('../controllers');

const authenticate = require('../middlewares/authenticate');

const authorize = require('../middlewares/authorize');

todoRouter.use(authenticate)

todoRouter.get('/', TodoController.findAll)

todoRouter.post('/add', TodoController.create)

todoRouter.use('/:id', authorize)

todoRouter.get('/:id', TodoController.findOne)

todoRouter.put('/update/:id', TodoController.update)

todoRouter.delete('/delete/:id', TodoController.delete)

module.exports = todoRouter