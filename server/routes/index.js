const router = require('express').Router()
const toDo = require('./toDo')
const user = require('./user')
const weather = require('./weather')


router.use('/todo', toDo)

router.use('/user', user)

router.use('/weather', weather)


module.exports = router