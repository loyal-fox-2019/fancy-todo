const router = require('express').Router()
const UserRoutes = require('./user')

router.use('/user', UserRoutes)

module.exports = router