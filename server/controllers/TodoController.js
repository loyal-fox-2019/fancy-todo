'user strict';

const Todo = require('../models/todo');

class TodoController {
    static create(req, res, next) {
        console.log('masuk create todo ')
        const name = req.body.name;
        const description = req.body.description;
        const due_date = (req.body.due_date);
        const userId = req.userLoggedIn;
        Todo.create({
            name,
            description,
            status: 'in progress',
            due_date
        })
        .then(todo => {
            console.log('created todo ')
            res.status(201).json({
                todo
            });
        })
        .catch(err => {
            console.log('error create todo '+err)
            res.status(500).json({
                message: err.message
            });
        });
    }

    static find(req, res, next) {
        Todo.find({
            userId: req.userLoggedIn
        })
        .then(todos => {
            res.status(200).json(todos);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static findOne(req, res, next) {
        Todo.findById(userId)
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static update(req, res, next) {
        Todo.findOne({
            _id: req.body.id
        })
        .then(todo => {
            if(!todo) {
                res.status(400).json({
                    message: 'Todo not found'
                });
            } else {
                return Todo.update({
                    name: req.body.name,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.dueDate
                });
            }
        })
        .then(todo => {
            res.status(201).json({
                message: 'Success update record'
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
    }

    static deleteOne(req, res, next) {
        Todo.deleteOne({
            _id: req.body.id
        })
        .then(todo => {
            if(!todo) {
                res.status(404).json({
                    message: 'Todo not found'
                });
            } else {
                res.status(200).json({
                    message: 'Success delete one record'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

}

module.exports = TodoController;