const router = require('express').Router()

router.use('/users', require('./userRouter'))
router.use('/todos', require('./todoRouter'))
router.use('/projects', require('./projectRouter'))


module.exports = router