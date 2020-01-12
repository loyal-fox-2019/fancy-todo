const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
const url = process.env.DB_URL;

mongoose.connect(url, {useNewUrlParser: true});

const Todo = require("../models/todo");

const _ = require('underscore');

class TodoController 
{
    static showAllTodos(req,res)
    {
        Todo.find().populate('user')
        .then((todos) => {
            res.status(200).json(todos);
        })
        .catch((err) => {
            res.status(400).json({
                msg: "invalid request"
            })
        })

    }

    static showTodoById(req,res)
    {
        Todo.findById(req.params.id,function(err,todo) {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                })
            }
            else if(todo)
            {
                res.status(200).json(todo);
            }
            else
            {
                res.status(404).json({
                    msg: "not found"
                })
            }
        })

        
    }

    static addTodo(req,res)
    {
        const data = _.pick(req.body,'name','description','due_date','user');
        
        Todo.create(data)
        .then((todo) => {            
            res.status(201).json(todo);
        })
        .catch((err) => {
            res.status(400).json({
                msg: "invalid request"
            })
        });
    }

    static updateTodo(req,res)
    {
        const data = _.pick(req.body,'name','description','due_date','user');
        
        Todo.findByIdAndUpdate(req.params.id,data,(err,todo) => {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                })
            }
            else
            {
                res.status(201).json(todo);
            }
        });
    }

    static deleteTodo(req,res)
    {
        Todo.findByIdAndDelete(req.params.id,(err) => {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                })
            }
            else
            {
                res.status(201).json({
                    msg: "delete success"
                });
            }
        });
    }
}

module.exports = TodoController;