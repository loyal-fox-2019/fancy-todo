const express = require('express')
const route = express.Router()
const user = require('./user')
const todo = require('./todo')
const project = require('./project')
const {authenticate} = require('../middlewares/userAuth')

route.use('/users', user)

route.use(authenticate)
route.use('/todos', todo)
route.use('/project',project)

module.exports = route