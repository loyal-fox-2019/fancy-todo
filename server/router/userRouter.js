const router = require('express').Router()
const UserController = require('../controller/UserController')

// admin tools
router.get('/test', UserController.test)
router.get('/adminAll', UserController.findAll)
router.delete('/masterdelete', UserController.masterDelete)


router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router