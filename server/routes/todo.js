'use strict';

const express = require('express');
const routes = express.Router();
const TodoController = require('../controllers/TodoController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

routes.use(authentication);

routes.post('/', TodoController.create);

routes.get('/', TodoController.read);

routes.put('/', authorization, TodoController.update);

routes.delete('/', authorization, TodoController.delete);

module.exports = routes;