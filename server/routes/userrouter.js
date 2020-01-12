const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')


router.post('/signup', usercontroller.signup)
router.post('/signin', usercontroller.signin)
router.post('/googlesignin', usercontroller.googlesignin)



module.exports = router