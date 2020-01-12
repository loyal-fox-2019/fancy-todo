const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/loginOAuth', UserController.loginOAuth)
router.post('/relog', UserController.relog)

module.exports = router