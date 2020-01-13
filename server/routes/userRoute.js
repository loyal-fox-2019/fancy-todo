const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require('../middlewares/auth')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/googleSignIn',userController.googleSignIn)
router.use(authentication)
router.patch('/',userController.handleInvitation)

module.exports = router