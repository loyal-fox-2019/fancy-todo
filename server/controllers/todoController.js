const Todo = require('../models/todo')
const User = require('../models/user')

class TodoController{

    static create(req,res,next){
        // console.log('di controller', req.session)
        // console.log(req.body)
        User.findOne({username: req.body.payload.username})
        .then(user=>{
            return Todo.create({
                title: req.body.title,
                description: req.body.description,
                subtitle: req.body.subtitle,
                status:req.body.status,
                in_date: req.body.in_date,
                due_date: req.body.due_date,
                userId: user._id,
                weather: req.body.weather
            })
        })
        .then(result=>{
            res.send({
                message: 'Todo created',
                result
            })
        })
        .catch(next)
    }
    static allTodo(req,res,next){
        // console.log('masuuuk')
        Todo.find({userId: req.body.payload.id})
        .then(results=>{
            if(results){
                res.status(200).send({
                    todos: results
                })
            }else{
                res.status(200).send({
                    message: 'there is nothing to do'
                })
            }
        })
        .catch(next)
    }
    static getOneTodo(req,res,next){
        const todoId=req.params.todoId
        Todo.findById(todoId)
        .then(todo=>{
            if(todo){
                res.status(200).send({
                    todo
                })
            }else{
                throw new Error(`${todoTitle} is not found`)
            }
        })
        .catch(next)
    }
    static updateWhole(req,res,next){
        // console.log(req.params)
        // console.log('mashooook')
        console.log(req.body)
        Todo.findOneAndUpdate(req.params.todoId,
            {
                title: req.body.title,
                subtitle: req.body.subtitle,
                description: req.body.description,
                due_date: req.body.due_date,
                weather: req.body.weather
            },{useFindAndModify:false})
        .then(result=>{
            console.log('mashooook')
            if(result.nModified==0){
                throw new Error('Please update all element')
            }else{
                res.status(200).send({
                    message:'Todo updated',
                    result
                })
            }
        })
        .catch(next)
    }
    static updateSpecific(req,res,next){
        Todo.update({title: req.params.todoTitle},{
            $set: req.body
        })
        .then(result=>{
            res.status(200).send({
                message:'Todo updated'
            })
        })
        .catch(next)
    }
    static deleteTodo(req,res,next){
        // console.log(req.params)
        // console.log('masuk delete')
        Todo.findByIdAndDelete(req.params.todoId)
        .then(result=>{
            // console.log('berhasil')
            if(result.deletedCount==0){
                res.send({
                    message: 'todo not found',
                    result
                })
            }else{
                res.status(200).send({
                    message:'todo deleted',
                    result
                })
            }
        })
        .catch(next)
    }
    static getOneTitle(req,res,next){
        Todo.findOne({title: req.params.todoTitle})
        .then(result=>{
            if(result){
                res.send(result)
            }else{
                throw new Error('title not found')
            }
        })
        .catch(next)
    }
}

module.exports = TodoController