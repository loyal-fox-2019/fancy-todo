const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.post('/signin', AuthController.signIn)
router.post('/signup', AuthController.signUp)
router.post('/github/:code', AuthController.github)

module.exports = router