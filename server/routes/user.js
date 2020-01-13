'use strict'

const express = require('express')
const Router = express.Router()
const { UserController, TodoController, GroupController } = require('../controllers')

Router.get('/', UserController.getAllUser)
Router.get('/todos', TodoController.getAllUserTodos)
Router.get('/groups', GroupController.getAllUserGroups)

module.exports = Router