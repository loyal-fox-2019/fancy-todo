const User = require('../models/userModel');
const jwt = require('../helpers/jwt');
const {verifier} = require('../helpers/bcrypt');

class AdminController{
    static update(req,res,next){
        User.updateOne({
            _id : req.params._id
        },{
            title : req.body.title,
            description : req.body.description
        })
        .then(response =>{
            if(response.n === 0){
                res.status(400).json({message : "No data found", response})
            }
            res.status(201).json({message : "updated User", response})
        })
        .catch(err =>{
            console.log(err)
            next("internal-server")
        })
    }

    static findAll(req,res,next){
        User.find()
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            next("internal-server")
        })
    }
    
    static delete(req,res,next){
        User.findByIdAndDelete(req.params._id)
        .then(response =>{
            res.status(200).json({message : "deleted User", response})
        })
        .catch(err =>{
            next("internal-server")
        })
    }
}

module.exports = AdminController

