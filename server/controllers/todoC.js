const Todo = require('../models/todos')

class Controller {

    static seriouslyAllTodo(req, res, next) {
        Todo.find()
            .then((todos) => {
                res.status(200).json(todos)
            }).catch(next);
    }

    static showAllTodos(req, res, next) {
        Todo.find({ creator: req.decoded.id })
            .then((todos) => {
                res.status(200).json(todos)
            })
            .catch(next);
    }

    static showProjectTodo(req, res, next) {
        Todo.find({ project: req.params.projectId })
            .then((todos) => {
                res.status(200).json(todos)
            })
            .catch(next);
    }

    static create(req, res, next) {
        const { title, description, status, due_date } = req.body
        const owner = req.decoded.id

        let dataObj = {
            title: title,
            description: description,
            status: status,
            due_date: due_date,
            creator: owner
        }

        if (req.params.projectId) {
            dataObj.project = req.params.projectId
        }

        Todo.create(dataObj)
            .then((todo) => {
                res.status(201).json(todo)
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(next);
    }

    static statusDone(req, res, next) {
        Todo.findByIdAndUpdate(req.params.id, {
            status: 'done'
        }, { new: true })
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(next);
    }

    static editTodo(req, res, next) {
        const { title, description, due_date } = req.body
        Todo.findByIdAndUpdate(req.params.id, {
            title: title,
            description: description,
            due_date: due_date
        }, { new: true })
            .then((todo) => {
                res.status(200).json(todo)
            }).catch(next);
    }

}

module.exports = Controller