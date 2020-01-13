const router = require('express').Router()
const usersRoutes = require('./users')
const todosRoutes = require('./todos')
const projectsRoutes = require('./projects')
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
router.use('/api/users', usersRoutes)
router.use('/api/todos', todosRoutes)
router.use('/api/projects', projectsRoutes)

module.exports = router