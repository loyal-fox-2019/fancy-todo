const mainRouter = require('express').Router();

const userRouter = require('./user');
const todoRouter = require('./todo');

mainRouter.use('/users', userRouter)
mainRouter.use('/todos', todoRouter)

module.exports = mainRouter
