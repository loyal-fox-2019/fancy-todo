'use strict'

const express = require('express')
const user = express.Router()
const userCon = require('../controllers/UserCon')
const googleSignIn = require('../middlewares/googleSignIn')
const { authenticate } = require('../middlewares/userAuth')


user.get('/', userCon.findAll)
user.post('/', userCon.register)
user.post('/login', userCon.login)
user.post('/login-google', googleSignIn ,userCon.loginGoogle)

user.use(authenticate)

user.get('/one', userCon.find)

module.exports = user