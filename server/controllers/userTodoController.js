'use strict'

const userTodoModel = require('../models/userTodo')
const ObjectId = require('mongoose').Types.ObjectId

class UserTodoController {

    static createUserTodo(req, res, next) {
        const userTodoData = {
            user: req.decode.userID,
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
        userTodoModel.create(userTodoData)
            .then(todo => {
                res.status(201).json({
                    message: `create todo success !`,
                    todo: {
                        todoID: todo._id,
                        title: todo.title,
                        description: todo.description,
                        dueDate: todo.dueDate,
                        status: todo.status
                    }
                })
            })
            .catch(next)
    }

    static updateUserTodo(req, res, next) {
        const todoUpdateData = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status
        }
        userTodoModel.findOneAndUpdate({ _id: req.params.userTodoID }, todoUpdateData, { runValidators: true, new: true })
            .then(todo => {
                res.status(200).json({
                    message: `todo with ID ${req.params.userTodoID} updated!`,
                    todo: {
                        todoID: todo._id,
                        title: todo.title,
                        description: todo.description,
                        dueDate: todo.dueDate,
                        status: todo.status
                    }
                })
            })
            .catch(next)
    }

    static getAllUserTodo(req, res, next) {
        userTodoModel.find({ user: new ObjectId(req.decode.userID) }, '_id title description dueDate status')
            .sort({ dueDate: 'asc' })
            .then(todos => {
                res.status(200).json({
                    message: 'success',
                    todos
                })
            })
    }
}

module.exports = UserTodoController