"use strict"

const Todo = require('../models/todo')

class TodoController {
    static findAll(req, res, next) {
        Todo.find({ userId: req.user._id })
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                next(err)
            });
    }

    static create(req, res, next) {
        const { name, description, status, dueDate } = req.body
        // console.log(name, description, status, dueDate)
        Todo.create({
            name,
            description,
            status,
            dueDate,
            userId: req.user._id
        })
            .then(() => {
                return Todo.find({ userId: req.user._id })
            })
            .then((todos) => {
                res.status(201).json(todos)
            }).catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        Todo.findByIdAndUpdate({
            _id: req.params.id
        }, {
            status: "completed"
        })
            .then(() => {
                return Todo.find({ userId: req.user._id })
            })
            .then((todos) => {
                res.status(200).json(todos)
            }).catch((err) => {
                next(err)
            });
    }

    static delete(req, res, next) {
        Todo.findOneAndDelete({
            _id: req.params.id
        }, {
            user: req.user._id
        })
            .then(() => {
                return Todo.find({ userId: req.user._id })
            })
            .then((todos) => {
                res.status(200).json(todos)
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = TodoController