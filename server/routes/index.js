const router = require('express').Router()
const toDo = require('./toDo')

router.use('/todo', toDo)


module.exports = router