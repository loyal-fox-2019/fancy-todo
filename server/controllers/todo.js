const Todo = require('../models/todo');

class TodoController {
    static create(req, res, next) {
        req.body.userId = req.userInfo.id
        Todo.create(req.body)
            .then((result) => {
                res.status(201).json({
                    msg: 'Todo\'s Added',
                    result
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    err
                })
            });
    }

    static findAll(req, res, next) {
        Todo.find({
            userId: req.userInfo.id
        })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                next(err)
            });
    }

    static findOne(req, res, next) {
        Todo.findById(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        Todo.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.status(200).json({
                    msg: 'Todo has been updated'
                })
            })
            .catch((err) => {
                next(err)
            });
    }

    static delete(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
            .then((result) => {
                res.status(200).json({
                    msg: 'Todo has been deleted',
                    result
                })
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = {
    TodoController
};
