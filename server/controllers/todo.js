const Todo = require('../models/todo')

class TodoController{
    static create(req,res,next){
        let data = {
            name: req.body.name,
            description: req.body.description,
            due_date: new Date(req.body.due_date),
            user_id: req.body.user_id
        }
        Todo.create(data)
            .then(result => {
                res.status(201).json({
                    result,
                    message: 'Todo added!'
                })
            })
            .catch(next)
    }

    static getAll(req,res,next){
        Todo.find({user_id: req.params.user_id}).populate('user_id')
            .then(results => {
                res.status(200).json(results)
            })
            .catch(next)
    }

    static updateStatus(req,res,next){
        Todo.updateOne({_id: req.params.id}, {status: req.body.status})
            .then(data => {
                res.status(200).json({
                    data,
                    message: 'Status updated'
                })
            })
            .catch(next)
    }

    static update(req,res,next){
        let data = {
            name: req.body.name,
            description: req.body.description,
            due_date: req.body,due_date
        }
        Todo.updateOne({_id:req.params.id}, data)
            .then(data => {
                res.status(200).json({
                    data,
                    message: 'Todo updated'
                })
            })
            .catch(next)
    }

    static deleteTodo(req,res,next){
        Todo.remove({_id: req.params.id})
            .then(data => {
                res.status(200).json({
                    message: 'Todo removed'
                })
            })
            .catch(next)
    }
}

module.exports = TodoController