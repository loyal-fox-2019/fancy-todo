const Todomodel = require('../models/todomodel')
const Usermodel = require('../models/usermodel')
const axios = require('axios')

class Todo{
    static findall(req,res,next){
        Todomodel.find({
            user: req.userid.userid
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static findone(req,res,next){
        Todomodel.findById(req.params.id)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static create(req,res,next){
        let input = req.body
        input.user = req.userid.userid
        let user = null
        let todo = null

        Usermodel.findById(req.userid.userid)
        .then((data)=>{
            user = data
            return Todomodel.create(input)
        })
        .then((data)=>{
            todo = data
            return axios.post('https://api.chat-api.com/instance91363/sendMessage?token=g6ywazxq7ly0b7w6',{"phone": user.phone,"body": `Hai ${user.first_name} jangan lupa ${data.name}`})
        })
        .then((data)=>{
            res.status(201).json(todo)
        })
        .catch((err)=>{
            next()
        })
    }

    static delete(req,res,next){
        Todomodel.deleteOne({
            "_id": req.params.todoid,
            user: req.userid.userid
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static patch(req, res, next){
        Todomodel.updateOne({
            "_id": req.params.todoid,
        }, {$set:{status: true}})
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

}


module.exports = Todo