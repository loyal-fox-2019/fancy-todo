const Todo = require('../models/todo')
const Group = require('../models/group')

class todoController {
    static create( req,res,next ) {
        if( req.query.group ) {
            Todo.create({
                name : req.body.name,
                description : req.body.description,
                status : 'pending',
                createdBy : req.decoded.id,
                group : req.body.groupId,
                dueDate: req.body.date
            })
                .then(todo => {
                    return Group.updateOne({_id:req.body.groupId},{
                        $push : { todos: todo._id}
                    })
                })
                .then( result => res.status(201).json(result))
                .catch(next)    
        } else {
            Todo.create({
                name : req.body.name,
                description : req.body.description,
                status : 'pending',
                createdBy : req.decoded.id,
                group : null,
                dueDate: req.body.date
            })
                .then(todo => {
                    res.status(201).json(todo)
                })
                .catch(next)
        }
    }

    static getAll( req,res,next ) {
        Todo.find({createdBy:req.decoded.id,group:null})
            .populate('createdBy')
            .populate('group')
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static delete( req,res,next ) {
        Todo.deleteOne({_id:req.params.id})
            .then(result => res.status(201).json(result))
            .catch(next)
    }

    static update( req,res,next ) {
        console.log(req.body)
        Todo.updateOne({_id: req.params.id},{
            name : req.body.name,
            description : req.body.description,
            dueDate: req.body.date
        },{
            runValidators:true
        })
            .then(result => res.status(201).json(result))
            .catch(next)
    }

    static patch ( req,res,next ) {
        Todo.findOne({_id: req.params.id})
        .then( todo => {
            if(todo.status === 'pending') {
                return Todo.updateOne({_id: req.params.id},{
                    $set: { status:'finished' }
                })
            } else {
                return Todo.updateOne({_id:req.params.id},{
                    $set: { status:'pending' }
                })
            }
        })
        .then( result => {
            res.status(201).json(result)})
        .catch( next )
    }
}

module.exports = todoController