const router = require('express').Router()
const UserRoutes = require('./user')
const TodoRoutes = require('./todo')
const FootballRoutes = require('./football')

router.use('/user', UserRoutes)
router.use('/todo', TodoRoutes)
router.use('/football', FootballRoutes)

module.exports = router