'use strict'

const router = require('express').Router()

const userRouter = require('./user')
const userTodoRouter = require('./userTodo')
const projectRouter = require('./project')

const authentication = require('../middlewares/authentication')

router.use('/users', userRouter)
router.use(authentication)
router.use('/userTodos', userTodoRouter)

module.exports = router