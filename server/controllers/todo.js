"use strict"

const Todo = require('../models/todo');

class TodoCtr {
    static create(req, res, next) {
        Todo.create(req.body)
        .then((todo) => {
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static read(req, res, next) {
        // ambil id user dari data token
        Todo.find({
            user_id: {
                _id: "5e1aab6c8fdc446e5ed50e9e"
            }
        })
        .populate('user_id')
        .then((todos) => {
            res.status(200).json(todos)
        })
        .catch(next)
    }
    
    static update(req, res, next) {
        Todo.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Todo.findOne({_id: req.params.id})
            .then((todo) => {
                res.status(200).json(todo)
            })
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Todo.findByIdAndRemove({_id: req.params.id})
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch(next)
    }
}

module.exports = TodoCtr;