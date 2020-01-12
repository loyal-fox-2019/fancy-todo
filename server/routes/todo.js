'use strict';

const express = require('express');
const routes = express.Router();
const TodoController = require('../controllers/TodoController');
const authentication = require('../middleware/authentication');

routes.use(authentication);

routes.post('/', TodoController.create);

routes.get('/', TodoController.read);

routes.put('/', TodoController.update);

routes.delete('/', TodoController.delete);

module.exports = routes;