const userRouter = require('express').Router();

const { UserController } = require('../controllers');

userRouter.post('/register', UserController.registrate)

const authenticate = require('../middlewares/authenticate');

userRouter.use(authenticate)

userRouter.post('/login', UserController.login)

module.exports = userRouter
