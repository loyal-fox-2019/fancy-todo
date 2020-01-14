const userRouter = require('express').Router();

const { UserController } = require('../controllers');

userRouter.post('/register', UserController.registrate)

userRouter.post('/login', UserController.login)

userRouter.post('/g_auth', UserController.gSignIn)

module.exports = userRouter
