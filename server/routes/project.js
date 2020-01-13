'use strict'

const route = require('express').Router()
const ProjectCon = require('../controllers/ProjectCon')
const {authorize} = require('../middlewares/projectAuth')
const {authorize2} = require('../middlewares/projectAuth')


route.get('/',ProjectCon.findAll)
route.get('/one/:id', ProjectCon.findOneProject)
route.get('/:id',ProjectCon.finOneTodo)
route.post('/', ProjectCon.create)
route.patch('/',authorize ,ProjectCon.addMember)
route.patch('/todo',authorize2,ProjectCon.addTodo)
route.put('/',authorize, ProjectCon.update)
route.put('/:id',authorize2,ProjectCon.updateTodo)
route.delete('/',authorize, ProjectCon.destroy)
route.delete('/:id', authorize2,ProjectCon.deleteTodo)

module.exports = route