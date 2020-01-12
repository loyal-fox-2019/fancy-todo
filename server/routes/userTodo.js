'use strict'

const router = require('express').Router()
const userTodoController = require('../controllers/userTodoController')

router.get('/', userTodoController.getAllUserTodo)
router.post('/', userTodoController.createUserTodo)
router.patch('/:userTodoID', userTodoController.updateUserTodo)

module.exports = router