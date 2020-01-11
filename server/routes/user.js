const router = require('express').Router()
const UserController = require('../controllers/user')

// regist & login
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// get data
router.get('/', UserController.getData)

module.exports = router