const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/google', controller.googleLogin)

router.post('/', controller.create)

router.post('/login', controller.webLogin)

module.exports = router