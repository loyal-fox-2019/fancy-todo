const router = require('express').Router();
const ControllerUser = require('../controllers/userC')
const {authentication} = require('../middlewares/auth')

router.post('/login', ControllerUser.login)

router.post('/register', ControllerUser.register)

router.get('/invitation', authentication, ControllerUser.getInvitation)

router.get('/', ControllerUser.listUser)

router.post('/google', ControllerUser.googleSignIn)
 

module.exports = router;