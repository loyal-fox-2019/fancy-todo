const router = require('express').Router()
const controller = require('../controllers/user')


router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/google', controller.loginGoogle)


module.exports = router