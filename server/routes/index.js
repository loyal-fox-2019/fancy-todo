const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const projectRouter = require('./project-router')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/projects', projectRouter)

module.exports = router
