'use strict'

const express = require('express')
const Router = express.Router()
const { GroupController, TodoController } = require('../controllers')
const { authorizeGroup, authorizeLeaderGroup } = require('../middlewares/auth')

Router.post('/', GroupController.createGroup)

Router.use('/:id', authorizeGroup)
Router.get('/:id', GroupController.getOneGroup)
Router.post('/:id/todos', TodoController.createTodo)
Router.get('/:id/todos', TodoController.getAllGroupTodos)
Router.delete('/:id/leave', GroupController.LeaveGroup)

Router.use('/:id', authorizeLeaderGroup)
Router.patch('/:id', GroupController.editGroupName)
Router.delete('/:id', GroupController.deleteGroup)
Router.patch('/:id/members', GroupController.inviteMember)
Router.delete('/:id/members/:member_id', GroupController.kickMember)

module.exports = Router
