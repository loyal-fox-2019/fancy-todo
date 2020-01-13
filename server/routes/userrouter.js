const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const err = require('../middleware/errhandling')


router.post('/signup', usercontroller.signup)
router.post('/signin', usercontroller.signin)
router.post('/googlesignin', usercontroller.googlesignin)

router.use(err.err)


module.exports = router