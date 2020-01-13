const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')


router.post('/', UserController.create)
router.post('/login', UserController.login)
router.post('/gsignin', UserController.gsignin)
router.get('/', UserController.getUsers)
router.delete('/:username',authentication, UserController.delete)

module.exports = router