'use strict'

const router = require('express').Router()

const userRouter = require('./user')
const userTodoRouter = require('./userTodo')
const projectRouter = require('./project');

router.use('/users', userRouter)
router.use('userTodos', userTodoRouter)

module.exports = router