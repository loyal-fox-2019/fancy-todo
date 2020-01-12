const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.findAll)
router.get('/id', UserController.findOne)
module.exports = router