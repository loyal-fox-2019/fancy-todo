const router = require('express').Router(),
  UserController = require('../controllers/user')

router.get('/', UserController.all)

module.exports = router
