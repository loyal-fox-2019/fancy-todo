const toDo = require('../models/toDo')

class toDoController{
    static create(req, res, next){
        let date = req.body.due_date.split('-')
        // console.log(date)
        toDo.create({
            name : req.body.name,
            description : req.body.description,
            status: 'Not Done',
            importanceLevel: req.body.importanceLevel,
            due_date: new Date(Number(date[0]), Number(date[1])-1, Number(date[2])+1),
            userId: req.loggedUser.id 
        })
        .then(todoData=>{
            res.status(201).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findAll(req, res, next){
        // console.log(req.loggedUser.id)
        let toDoListDisplay
        toDo.find({userId:req.loggedUser.id, status:'Not Done'})
        .then(toDoList=>{
            if(toDoList.length<1){
                res.status(404).json({message:'You have no Active todoList'})
            }
            toDoList.forEach(todo=>{
                if(todo.due_date < new Date()){
                    todo.status = 'EXPIRED'
                }
            })
            toDoListDisplay = toDoList
            return toDo.updateMany({
                
                    $and : [
                        {status : 'Not Done'},
                        {due_date : {
                            $lt : new Date()
                        }}
                    ]
                
            },{
                status : 'EXPIRED'
            })
        })
        .then(updated=>{
            res.status(200).json(toDoListDisplay)
        })
        .catch(err=>{
            next()
        })
    }

    static findToday(req, res, next){
        let today = new Date().getDate()+1
        toDo.find({userId:req.loggedUser.id, status:'Not Done', due_date: {$lt:new Date().setDate(today)}})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findNormal(req, res, next){
        toDo.find({userId:req.loggedUser.id, status:'Not Done', importanceLevel: 'Normal'})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no Normal todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findImportant(req, res, next){
        toDo.find({userId:req.loggedUser.id, status:'Not Done', importanceLevel: 'Important'})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no Important todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findUrgent(req, res, next){
        toDo.find({userId:req.loggedUser.id, status:'Not Done', importanceLevel: 'Urgent'})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no Urgent todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findAllTodos(req, res, next){
        let today = new Date().getDate()+1
        toDo.find({userId:req.loggedUser.id})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findTomorrow(req, res, next){
        let today = new Date().getDate()+1
        toDo.find({userId:req.loggedUser.id, status:'Not Done', due_date: {$gt:new Date().setDate(today)}})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findExpired(req, res, next){
        toDo.find({userId:req.loggedUser.id, status:'EXPIRED'})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no Expired todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findFinished(req, res, next){
        toDo.find({userId:req.loggedUser.id, status:'Finished'})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json('You have no finished todoList')
            }
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static findInactive(req, res, next){
        toDo.find({userId:req.loggedUser.id, status:{$ne:'Not Done'}})
        .then(todoData=>{
            if(todoData.length<1){
                res.status(404).json({message:'You have no Inactive todoList'})
            }
            // console.log(todoData)
            res.status(200).json(todoData)
        })
        .catch(err=>{
            // console.log(err)
            next()
        })
    }

    static findOne(req, res, next){
        toDo.find({userId:req.loggedUser.id})
        .then(toDoData=>{
            const filtered = toDoData.filter(toDoData=>{
                if(toDoData.name.includes(req.body.name)){
                    return toDoData
                }
            }
            )
            res.status(200).json(filtered)
        })
        .catch(err=>{
            next()
        })
    }

    static findOneTodo(req, res, next){
        toDo.findOne({_id:req.params.id})
        .then(todoData=>{
            res.status(200).json(todoData)
        })
        .catch(err=>{
            next()
        })
    }

    static delete(req, res, next){
        toDo.deleteOne({_id:req.params.id, userId:req.loggedUser.id})
        .then(success=>{
            return toDo.find({userId:req.loggedUser.id})
        })
        .then(toDoDatas=>{
            res.status(200).json(toDoDatas)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static editOne(req, res, next){
        let date = req.body.due_date.split('-')
        toDo.updateOne({_id:req.params.id}, {
            name : req.body.name,
            description : req.body.description,
            status: req.body.status,
            importanceLevel: req.body.importanceLevel,
            due_date: new Date(Number(date[0]), Number(date[1])-1, Number(date[2])+1)
        })
        .then(updatedToDo=>{
            return toDo.find({_id:req.params.id})
        })
        .then(updatedTodo=>{
            res.status(200).json(updatedTodo)
        })
        .catch(err=>{
            next()
        })
    }

    static changeStatus(req, res, next){
        toDo.updateOne({_id:req.params.id, userId:req.loggedUser.id}, {status:'Finished'})
        .then(success=>{
            return toDo.findOne({userId:req.loggedUser.id, status:'Not Done'})
        })
        .then(toDoDatas=>{
            res.status(200).json(toDoDatas)
        })
        .catch(err=>{
            next()
        })
    }
}

module.exports = toDoController