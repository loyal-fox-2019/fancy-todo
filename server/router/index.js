const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')
const authentication = require('../middlewares/authentication')

router.use('/users', user)
router.use(authentication)
router.use('/todos', todo)


module.exports = router