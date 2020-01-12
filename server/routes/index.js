const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const userAuthenticate = require('../middlewares/user-auth')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/google-login', UserController.googleLogin)
router.use(userAuthenticate)
router.use('/users', require('./user-router'))
router.use('/projects', require('./project-router'))

module.exports = router
