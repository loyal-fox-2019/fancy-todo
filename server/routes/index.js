"use strict"
const routes = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')

// routes.get('/test', (req, res, next) => res.status(200).json({ message: 'ok' }));
routes.use('/users', userRouter)
routes.use('/todos', todoRouter)

module.exports = routes