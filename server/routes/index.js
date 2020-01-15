'use strict'

const router = require('express').Router()

const userRouter = require('./user')
const userTodoRouter = require('./userTodo')
const projectRouter = require('./project')
const projectTodoRouter = require('./projectTodo');

const authentication = require('../middlewares/authentication')

router.use('/users', userRouter)
router.use('/userTodos', userTodoRouter)
router.use('/projects', projectRouter)
router.use('/projectTodos', projectTodoRouter)

module.exports = router