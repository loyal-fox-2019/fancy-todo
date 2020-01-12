const todosRouter = require("express").Router();

const express = require("express");
todosRouter.use(express.urlencoded({extended:true}));

const TodoController = require("../controllers/todoController");

const authorisation = require("../middlewares/authorisation");

todosRouter.get('/',(req,res) => {
    //res.send('Todo list');
    TodoController.showAllTodos(req,res);
});

todosRouter.get('/:id',authorisation,(req,res) => {
    //res.send('Todo detail');
    TodoController.showTodoById(req,res);
});

todosRouter.post('/',(req,res) => {
    //res.send('add Todo');
    TodoController.addTodo(req,res);
});

todosRouter.put('/:id',authorisation,(req,res) => {
    //res.send('update Todo');
    TodoController.updateTodo(req,res);
});

todosRouter.patch('/:id',authorisation,(req,res) => {
    //res.send('update Todo');
    TodoController.updateTodo(req,res);
});

todosRouter.delete('/:id',authorisation,(req,res) => {
    //res.send('delete Todo');
    TodoController.deleteTodo(req,res);
});

module.exports = todosRouter;