'use strict';

const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController');

routes.post('/register', UserController.register);

routes.post('/privateAuth', UserController.privateLogin);

routes.post('/openAuth', UserController.openLogin);

module.exports = routes;