const TodoModel = require('../models/todo')
const UserModel = require('../models/user')

class TodoController {
    static create(req,res,next){
        TodoModel.create(req.body.data)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }

    static findAll(req,res,next) {
        let userId = req.user.userId
        TodoModel.find({
            user: userId
        }).populate('user')
        .then(datas=>{
            res.status(200).json(datas)          
        })
        .catch(next)
    }

    static patch(req,res,next) {
        TodoModel.findByIdAndUpdate(req.body.data.todoId, {
            status: req.body.data.newDone
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    
    static delete(req,res,next) {        
        TodoModel.findByIdAndDelete(req.params.todoId)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TodoController