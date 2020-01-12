const Todo = require('../models/todos')

class Controller {
    // checked
    static seriouslyAllTodo(req, res, next) {
        Todo.find()
            .then((todos) => {
                res.status(200).json(todos)
            }).catch(next);
    }
    // checked
    static showAllTodos(req, res, next) {
        Todo.find({ creator: req.decoded.id })
            .then((todos) => {
                res.status(200).json(todos)
            })
            .catch(next);
    }

    static showSingleTodo(req, res, next) {
        Todo.findById({ _id: req.params.id, creator: req.decoded.id })
            .then((todo) => {
                res.status(200).json(todo)
            }).catch(next);
    }
    // checked
    static showProjectTodo(req, res, next) {
        Todo.find({ project: req.params.projectId })
            .then((todos) => {
                res.status(200).json(todos)
            })
            .catch(next);
    }

    static showTodoFromUserProject(req, res, next) {
        Todo.find({ project: { $in: req.body.projectList } })
            .populate('creator')
            .populate('project')
            .then((todos) => {
                res.status(200).json(todos)
            }).catch(next);
    }

    // checked for user and project
    static create(req, res, next) {
        const { title, description, due_date } = req.body
        // console.log(req.decoded.id);
        let dataObj = {
            title,
            description,
            due_date,
        }

        if (req.params.projectId) {
            dataObj.project = req.params.projectId
        } else {
            dataObj.creator = req.decoded.id
        }

        Todo.create(dataObj)
            .then((todo) => {
                res.status(201).json(todo)
            })
            .catch(next);
    }
    // checked
    static delete(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(next);
    }
    // checked
    static statusDone(req, res, next) {
        Todo.findByIdAndUpdate(req.params.id, {
            status: 'done'
        }, { new: true, runValidators: true })
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(next);
    }
    // checked
    static editTodo(req, res, next) {
        const { title, description, due_date } = req.body
        Todo.findByIdAndUpdate(req.params.id, {
            title: title,
            description: description,
            due_date: due_date
        }, { new: true, runValidators: true })
            .then((todo) => {
                res.status(200).json(todo)
            }).catch(next);
    }

}

module.exports = Controller