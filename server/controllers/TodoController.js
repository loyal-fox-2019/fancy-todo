const Todo = require('../models/Todo')

class TodoController{
    static create(req, res, next) {
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                status: 'next up',
                due_date: req.body.due_date,
                project: req.body.project,
                ownerTodo: req.userId
            })
            .then(todo => {
                res.status(201).json({
                    todo
                })
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        
    }
}

module.exports = TodoController