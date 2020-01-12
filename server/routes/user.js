'use strict'

const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/', userController.signUp)
router.post('/signin', userController.signIn)
router.use(authentication)
router.get('/profile', userController.getProfile)
router.patch('/profile', userController.updateProfile)
router.patch('/profile/password', userController.changePassword)
router.patch('/profile/email', userController.changeEmail)
router.get('/profile/:userID', userController.getUserProfile)

module.exports = router