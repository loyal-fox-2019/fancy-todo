'use strict'
const Project = require('../models/project')
const Todo = require('../models/todo')

class ProjectCon {
    static findAll(req,res,next){
        Project.find({
            $or: [
                {owner: req.user._id},
                {members: req.user._id}
            ]
        })
            .populate('members')
            .populate('owner')
            .populate({
                path : 'todos',
                populate : {path : 'user'}
            })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOneProject(req,res,next){
        Project.findOne({
            _id : req.params.id
        })
            .populate('members')
            .populate('owner')
            .populate({
                path : 'todos',
                populate : {path : 'user'}
            })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req,res,next){
        Project.create({
            title: req.body.title,
            owner: req.user._id,
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(next)
    }

    static update(req,res,next){
        Project.updateOne({
            _id : req.headers.id_project
        },{
            title : req.body.title
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static destroy(req,res,next){
        Project.deleteOne({
            _id : req.headers.id_project
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static addMember(req,res,next){
        Project.findOne({
            _id : req.headers.id_project
        })
        .then(data =>{
            let member = data.members
            const cekMember = member.includes(req.body.idUser)
            if(data.owner == req.body.idUser || cekMember){
                throw {
                    status : 400,
                    message: `invalid member id`
                }
            }else{
                return  Project.updateOne({
                    _id : req.headers.id_project
                },{
                    $push : {members: req.body.idUser}
                })
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static addTodo(req,res,next){
            const user = req.user._id
            const status = false
            const projectId = req.headers.id_project
            const {title, description, dueDate} = req.body 
            Todo.create({title, description, dueDate, status, user,projectId})
            .then(todo =>{
                return Project.updateOne({
                    _id : req.headers.id_project
                },{
                    $push : {todos: todo._id}
                })
            })
            .then(data =>{
                res.status(201).json(data)
            })
            .catch(next)
    }

    static finOneTodo(req,res,next){   
        Todo.find({
            _id : req.params.id, 
            projectId: req.headers.id_project})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateTodo(req,res,next){
        const {title, description, dueDate} = req.body      
        Todo.updateOne({
            _id : req.params.id, 
            projectId: req.headers.id_project}, 
            {title, description, dueDate})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteTodo(req,res,next){
        const projectId = req.headers.id_project
        const _id = req.params.id      
        Todo.deleteOne({_id,projectId})
        .then(todo =>{
            res.status(200).json(todo)
        })
        .catch(next)
    }
}

module.exports = ProjectCon