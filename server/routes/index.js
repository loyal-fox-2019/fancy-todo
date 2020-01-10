const router = require('express').Router(),
  userRoutes = require('./user'),
  UserController = require('../controllers/user')

router.use('/user', userRoutes)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router
