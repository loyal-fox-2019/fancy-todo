const Todomodel = require('../models/todomodel')

class Todo{
    static findall(req,res,next){
        Todomodel.find({
            user: req.userid
        })
        .then((data)=>{
            res.status(200).json(data)
        })
    }

    static create(req,res,next){
        let data = req.body
        data.user = req.userid.userid
        Todomodel.create(data)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{

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
    }

}


module.exports = Todo