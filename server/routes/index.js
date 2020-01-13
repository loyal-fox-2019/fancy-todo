const routes = require('express').Router()
const UserRoutes = require('./UserRoutes')
const TodoRoutes = require('./TodoRoutes')
const ProjectRoutes = require('./ProjectRoutes')

routes.use('/user', UserRoutes)
routes.use('/todo', TodoRoutes)
routes.use('/project', ProjectRoutes)

module.exports = routes