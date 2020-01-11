const router = require('express').Router()
const UserRoutes = require('./user')
const TodoRoutes = require('./todo')

router.use('/user', UserRoutes)
router.use('/todo', TodoRoutes)

module.exports = router