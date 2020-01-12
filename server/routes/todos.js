const todosRouter = require("express").Router();

const express = require("express");
todosRouter.use(express.urlencoded({extended:true}));

const TodoController = require("../controllers/todoController");

todosRouter.get('/',(req,res) => {
    //res.send('Todo list');
    TodoController.showAllTodos(req,res);
});

todosRouter.get('/:id',(req,res) => {
    //res.send('Todo detail');
    TodoController.showTodoById(req,res);
});

todosRouter.post('/',(req,res) => {
    //res.send('add Todo');
    TodoController.addTodo(req,res);
});

todosRouter.put('/:id',(req,res) => {
    res.send('update Todo');
    //TodoController.updateTodo(req,res);
});

todosRouter.patch('/:id',(req,res) => {
    res.send('update Todo');
    //TodoController.updateTodo(req,res);
});

todosRouter.delete('/:id',(req,res) => {
    //res.send('delete Todo');
    TodoController.deleteTodo(req,res);
});

module.exports = todosRouter;