'use strict'

const express = require('express')
const todoRouter = require('./todo')
const userRouter = require('./user')

const router = express.Router()

router.use('/todo', todoRouter)
router.use('/member', userRouter)

module.exports = router