const Todo = require('../models/todoModel');

class TodoController{
    static create(req,res,next){
        Todo.create({
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            owner : req.username
        })
        .then(newTodo =>{
            res.status(201).json({message : "created todo", newTodo })
        })
        .catch(err =>{
            next(err)
        })
    }

    static update(req,res,next){
        Todo.updateOne({
            _id : req.params._id
        },{
            title : req.body.title,
            description : req.body.description
        })
        .then(response =>{
            if(response.n === 0){
                next("todo-not-found")
                return
            }
            res.status(201).json({message : "updated todo", response})
        })
        .catch(err =>{
            next(err)
        })
    }

    static findOne(req,res,next){
        Todo.findById(req.params._id)
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static findAll(req,res,next){
        Todo.find({
            owner : req.username
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static delete(req,res,next){
        Todo.findByIdAndDelete(req.params._id)
        .then(response =>{
            res.status(200).json({message : "deleted todo", response})
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = TodoController
