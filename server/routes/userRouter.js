const router = require('express').Router();
const ControllerUser = require('../controllers/userC')
// const Auth = require('../middlewares/tokenCheck')

router.post('/login', ControllerUser.login)

router.post('/register', ControllerUser.register)

router.get('/', ControllerUser.listUser)
 

module.exports = router;