const router = require('express').Router(),
  { authenticate } = require('../middlewares/auth'),
  UserController = require('../controllers/user'),
  userRoutes = require('./user'),
  todoRoutes = require('./todo'),
  projectRoutes = require('./project')

  router.post('/register', UserController.register)
  router.post('/login', UserController.login)
  router.use(authenticate)
  router.use('/users', userRoutes)
  router.use('/todos', todoRoutes)
  router.use('/projects', projectRoutes)

module.exports = router
