'use strict';
const route = require('express').Router();
const controller = require('../controllers/user');

route.post('/', controller.register);
route.post('/login', controller.login);
route.post('/google', controller.loginGoogle);

module.exports = route