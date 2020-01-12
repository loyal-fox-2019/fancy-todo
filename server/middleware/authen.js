const jwt = require('jsonwebtoken')
const todomodel = require('../models/todomodel')
require('dotenv').config()


class Middleware{
    static authen (req,res,next){
        try{
            const verif = jwt.verify(req.headers.token, process.env.SECRET)
            const decode = jwt.decode(req.headers.token, process.env.SECRET) 
            req.userid = decode
            next()
        } catch(err){
            res.status(400).json({
                message: 'wrong todo'
            })

        }
    }

    static author (req,res,next){
        todomodel.findById(req.params.todoid)
        .then((data)=>{
            if(data !== null){
                if(data.user == req.userid.userid){
                    next()
                }else{
                    res.status(400).json({
                        message: "kamu tidak memili hak"
                    })
                }
            } else{
                res.status(404).json({
                    message: 'Todo Not Found'
                })
            }
        })
    }
}

module.exports = Middleware