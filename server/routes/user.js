const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/google', controller.googleLogin)

router.post('/', controller.create)

module.exports = router