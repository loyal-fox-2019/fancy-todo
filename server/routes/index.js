"use strict"

const express = require('express');
const routes = express();
const todoRoute = require('./todo');
const userRoute = require('./user');

routes.use('/todos', todoRoute);
routes.use('/users', userRoute);

module.exports = routes;