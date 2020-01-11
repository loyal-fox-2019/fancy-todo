const router = require('express').Router()
const userRouter = require('./userRouter.js')
const todoRouter = require('./todoRouter.js')
const projectRouter = require('./projectRouter')
const invitationRouter = require('./invitation.js')

router.use('/users', userRouter)

router.use('/todos', todoRouter)

router.use('/projects', projectRouter)

router.use('/invite', invitationRouter)

module.exports = router