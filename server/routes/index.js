const router = require('express').Router()
const user = require('../routes/userRoute')
const todo = require('../routes/todoRoute')
const group = require('../routes/groupRoute')

router.use('/user',user)
router.use('/todo',todo)
router.use('/group',group)

module.exports = router