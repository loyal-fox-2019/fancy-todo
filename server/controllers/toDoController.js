const toDo = require('../models/toDo')

class toDoController{
    static create(req, res, next){
        let date = req.body.due_date.split('-')
        toDo.create({
            name : req.body.name,
            description : req.body.description,
            status: 'Not Done',
            importanceLevel: req.body.importanceLevel,
            due_date: new Date(Number(date[2]), Number(date[1])-1, Number(date[0])+1)
        })
        .then(todoData=>{
            res.status(201).json(todoData)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static findAll(req, res, next){
        let toDoListDisplay
        toDo.find()
        .then(toDoList=>{
            toDoList.forEach(todo=>{
                if(todo.status != 'Finished' && todo.due_date < new Date()){
                    todo.status = 'EXPIRED'
                }
            })
            toDoListDisplay = toDoList
            toDo.updateMany({
                $and : {
                    $and : [
                        {status : 'Not Done'},
                        {due_date : {
                            $lt : new Date()
                        }}
                    ]
                }
            },{
                status : 'EXPIRED'
            })
        })
        .then(updated=>{
            res.status(200).json(toDoListDisplay)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static findOne(req, res, next){
        toDo.findOne({_id:req.params.id})
        .then(toDoData=>{
            res.status(200).json(toDoData)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static delete(req, res, next){
        toDo.deleteOne({_id:req.params.id})
        .then(deleted=>{
            res.status(200).json(deleted)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static editOne(req, res, next){
        let date = req.body.due_date.split('-')
        toDo.updateOne({_id:req.params.id}, {
            name : req.body.name,
            description : req.body.description,
            status: req.body.status,
            importanceLevel: req.body.importanceLevel,
            due_date: new Date(Number(date[2]), Number(date[1])-1, Number(date[0])+1)
        })
        .then(updatedToDo=>{
            res.status(200).json(updatedToDo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static changeStatus(req, res, next){
        
    }
}

module.exports = toDoController