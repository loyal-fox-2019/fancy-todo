'use strict';

const Todo = require('../models/todo');

class TodoController {
    static create(req, res, next) {
        const newTodo = {
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            user_id: req.headers.userId
        }
        Todo.create(newTodo)
        .then(todo => {
            res.status(201).json({
                message: "New todo has been created",
                data: todo
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static read(req, res, next) {
        Todo.find({user_id: req.headers.userId}).populate('User')
        .then(todos => {
            res.status(200).json({
                message: "OK",
                data: todos
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static update(req, res, next) {
        Todo.update({_id: req.body.todo_id}, {status: "Complete"})
        .then(todo => {
            if(todo.nModified === 0) {
                throw {
                    name: "BadRequest",
                    message: "Something error occured, please try again"
                }
            } else {
                res.status(200).json({
                    message: "Todo has been updated",
                    data: todo
                })
            }
        })
        .catch(error => {  
            next(error);
        })
    }

    static delete(req, res, next) {
        Todo.deleteOne({_id: req.body.todo_id})
        .then(todo => {
            if(todo.deleteCount === 0) {
                throw {
                    name: "BadRequest",
                    message: "Something error occured, please try again"
                }
            } else {
                res.status(200).json({
                    name: "BadRequest",
                    message: "Todo has been deleted"
                })
            }
        })
        .catch(error => {
            next(error);
        })
    }
}

module.exports = TodoController;