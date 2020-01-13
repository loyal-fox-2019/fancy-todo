const express = require('express')
const router = express.Router()

router.use('/todo', require('./todoRoutes'))
router.use('/user', require('./userRoutes'))
router.use('/weather', require('./weatherRoute'))

module.exports = router