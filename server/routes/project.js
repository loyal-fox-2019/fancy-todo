'use strict';
const route = require('express').Router();
const controller = require('../controllers/project');
const authentication = require('../middlewares/authentication');
const isMember = require('../middlewares/projectMember');
const TodoController = require('../controllers/todo');

route.use(authentication);
route.get('/', controller.listProject);
route.post('/', controller.createProject);
route.get('/:projectId', isMember, controller.viewProject);
route.post('/:projectId/addtodo', isMember, TodoController.createTodo);
route.patch('/:projectId/addmember', isMember, controller.addMember);

module.exports = route;
