const Model = require('../models/todo')

class Todo {
    static findByUser(req, res, next) {
        Model.find({ user: req.params.userid }).populate('user', 'username')
            .then(todos => {
                if (todos.length !== 0) {
                    res.status(200).json(todos)
                }
                else {
                    let errStatus = {
                        code: 404,
                        status: 'Not Found',
                        message: 'You Don\'t have Todos'
                    }
                    throw errStatus
                }
            })
            .catch(next)
    }
    static create(req, res, next) {
        Model.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            user: req.body.user
        })
            .then(created => {
                res.status(201).json(created)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        Model.findByIdAndDelete({ _id: req.params.id })
            .then(success => {
                if (success) {
                    res.status(200).json({ message: 'Successfully deleted Todos with title : ' + success.title })
                } else {
                    let errStatus = {
                        code: 404,
                        status: 'Not Found',
                        message: 'Cannot find Todos with Id : ' + req.params.id
                    }
                    throw errStatus
                }
            })
            .catch(next)
    }
    static update(req, res, next) {
        Model.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        })
            .then(success => {
                if (success) {
                    res.status(200).json({ message: 'Successfully update Todos with title : ' + success.title })
                } else {
                    let errStatus = {
                        code: 404,
                        status: 'Not Found',
                        message: 'Cannot find Todos with Id : ' + req.params.id
                    }
                    throw errStatus
                }
            })
            .catch(next)
    }
    static updateStatus(req, res, next) {
        Model.findByIdAndUpdate({ _id: req.params.id }, { status: req.body.status })
            .then(updated => {
                if (updated) {
                    res.status(200).json({ message: 'Successfully update Todos with title : ' + updated.title })
                } else {
                    let errStatus = {
                        code: 404,
                        status: 'Not Found',
                        message: 'Cannot find Todos with Id : ' + req.params.id
                    }
                    throw errStatus
                }
            })
            .catch(next)
    }
}
module.exports = Todo