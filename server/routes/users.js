const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/gsignin', UserController.gsignin)
router.get('/:email', UserController.getUsers)
module.exports = router