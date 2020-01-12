const router = require('express').Router()
const usersRoutes = require('./users')
const todosRoutes = require('./todos')

router.use('/api/users', usersRoutes)
router.use('/api/todos', todosRoutes)
// router.use('/api/projects', projectsRoutes)

module.exports = router