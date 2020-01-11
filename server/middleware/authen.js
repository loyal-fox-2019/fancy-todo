const jwt = require('jsonwebtoken')
const todomodel = require('../models/todomodel')


try{

    console.log(jwt.decode('eyJhbGciOiJIUzI1NiJ9.c2RzZHNk.oHLwNbujMf9cml0H9dZoKchdtmAfU9fKmDFoev7xjl0'))
} catch(err){
    console.log('errr')
}



class Middleware{
    static authen (req,res,next){
        try{
            const verif = jwt.verify(req.headers.token, 'secret')
            const decode = jwt.decode(req.headers.token, 'secret') 
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