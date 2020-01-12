const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const todosRouter = require('./todos')
const weatherRouter = require('./weather')

router.use('/user', userRouter)
router.use('/todos', todosRouter)
router.use('/weather', weatherRouter)

module.exports = router