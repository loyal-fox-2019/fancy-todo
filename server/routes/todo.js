'use strict'

const express = require('express')
const todo = express.Router()
const TodoCon = require('../controllers/TodoCon')
const {authorize} = require('../middlewares/todoAuth')


todo.get('/', TodoCon.findAll)
todo.get('/:id', TodoCon.findTodo)
todo.post('/',TodoCon.addTodo)
todo.delete('/:id' , authorize,TodoCon.deleteTodo)
todo.put('/:id' , authorize,TodoCon.updateTodo)
todo.patch('/:id' ,authorize,TodoCon.checkTodo)

module.exports = todo