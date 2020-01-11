const router = require('express').Router()
const toDo = require('./toDo')
const user = require('./user')


router.use('/todo', toDo)

router.use('/user', user)


module.exports = router