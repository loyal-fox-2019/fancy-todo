const Todo = require('../models/Todo')
const Project = require('../models/Project')
class TodoController{
    static create(req, res, next) {
        let resTodo;
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                status: 'next up',
                due_date: req.body.due_date,
                ownerTodo: req.userId
            })
            .then(todo => {
                resTodo = todo
                return Project
                            .updateOne({
                                _id: req.params.id
                            }, {
                                $push: {
                                    todos: [todo._id]
                                }
                            })
            })
            .then(project => {
                res.status(201).json({
                    todo: resTodo
                })
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Project
            .findOne({
                _id: req.params.id
            })
            .select('todos')
            .populate('todos')
            .then(({todos}) => {
                res.status(200).json({
                    todos
                })
            })
            .catch(next)
    }
    static findOne(req, res, next){
        Todo
            .findOne({
                _id: req.params.todoId
            })
            .then(todo => {
                res.status(200).json({
                    todo
                })
            })
            .catch(next)
    }

    static update(req, res, next){
        Todo    
            .update({
                _id: req.params.todoId,
            }, {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
            })
            .then(todo => {
                // if id not found >> todo.n === 0
                res.status(200).json({
                    todo
                })
            })
            .catch(next)
    }
    
    static updateStatus(req, res, next){
        Todo    
            .update({
                _id: req.params.todoId,
            }, {
                status: req.body.status
            })
            .then(todo => {
                // if id not found >> todo.n === 0
                res.status(200).json({
                    todo
                })
            })
            .catch(next)
    }
    static delete(req, res, next){
        let resTodo;
        Todo
            .deleteOne({_id: req.params.todoId})
            .then(todo => {
                resTodo = todo
                return Project
                        .updateOne({
                            _id: req.params.id
                        }, {
                            $pullAll: {
                                todos: [req.params.todoId]
                            }
                        })
            })
            .then(project => {
                res.status(200).json({
                    todo: resTodo
                })
            })
            .catch(next)
    }
}

module.exports = TodoController