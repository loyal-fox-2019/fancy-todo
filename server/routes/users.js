'use strict'

const router = require('express').Router()
const usersController = require('../controllers/usersController.js')
const { authentication } = require('../middlewares/auth.js')

router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/googleSignIn', usersController.googleSignIn)
router.get('/:email', authentication, usersController.findOne)

module.exports = router