'use strict'

const express = require('express')
const userController = require('../cotrollers/user')
const router = express.Router()

router.get('/signup', userController.signup)
router.post('/signin', userController.signin)

module.exports = router