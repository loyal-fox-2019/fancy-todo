'use strict'

const express = require('express')
const Router = express.Router()
const { TodoController } = require('../controllers')
const { authorizeTodo } = require('../middlewares/auth')

Router.post('/', TodoController.createTodo)

Router.use('/:id', authorizeTodo)
Router.get('/:id', TodoController.getOneTodo)
Router.put('/:id', TodoController.editTodo)
Router.patch('/:id/status', TodoController.updateStatus)
Router.delete('/:id', TodoController.deleteTodo)

module.exports = Router
