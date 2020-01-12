'use strict'

const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/users/myProfile', userController.getProfile)
router.patch('/users/myProfile', userController.updateProfile)
router.get('/users/:userID', userController.getUserProfile)
router.patch('/users/:userID/password', userController.changePassword)
router.patch('/users/:userID/email', userController.changeEmail)
router.patch('users/:userID/email/activation', userController.emailActivation)

module.exports = router