const Usermodel = require('../models/usermodel')
const Bcrypt = require('../helper/hashpassword')
const jwt = require('jsonwebtoken')

class User{
    static signup(req,res,next){
        Usermodel.create(req.body)
        .then((data)=>{
            res.status(201).json(data)
        })
    }

    static signin(req, res, next){
        let userid = null
        Usermodel.findOne({
            email: req.body.email
        })
        .then((data)=>{
            if(data === null){
                res.status(400).json({message: 'Wrong email/password'})
            }else{
                userid = data['_id']
                return Bcrypt.compare(req.body.password, data.password)
            }
        })
        .then((status)=>{
            if(status){
                let token = jwt.sign({userid}, 'secret')
                res.json({token})
            } else {
                res.status(400).json({message: 'Wrong email/password'})
            }
        })
    }

}

module.exports = User