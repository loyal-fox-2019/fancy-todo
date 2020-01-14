const router = require('express').Router(),
  UserController = require('../controllers/user')

router.get('/', UserController.all)
router.get('/todos', UserController.getTodo)
router.get('/projects', UserController.getProject)

module.exports = router
