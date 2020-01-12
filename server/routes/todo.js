const todoRouter = require('express').Router();

const { TodoController } = require('../controllers');

const authorize = require('../middlewares/authorize');

todoRouter.use(authorize)

todoRouter.get('/', TodoController.findAll)

todoRouter.get('/:id', TodoController.findOne)

todoRouter.post('/add', TodoController.create)

todoRouter.put('/update/:id', TodoController.update)

todoRouter.delete('/delete/:id', TodoController.delete)

module.exports = todoRouter