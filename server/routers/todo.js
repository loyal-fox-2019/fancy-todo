'use strict'

const express = require('express')
const todoController = require('../cotrollers/todo')
const router = express.Router()
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authenticate, todoController.getAll)
router.post('/',authenticate, todoController.create)
router.delete('/:id', authenticate, todoController.delete)
router.patch('/:id', authenticate, todoController.update)
router.put('/:id', authenticate, todoController.update)
module.exports = router