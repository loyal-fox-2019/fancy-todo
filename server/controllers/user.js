const User = require('../models/user')
const jwt = require('jsonwebtoken')
const comparePassword = require('../helpers/comparePassword')

class UserController{
    static register(req,res,next){
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(data)
            .then(result => {
                res.status(201).json({
                    message: 'Registration Success!'
                })
            })
            .catch(next)
    }

    static login(req,res,next){
        console.log(req.body.email)
        User.findOne({email: req.body.email})
            .then(data => {
                console.log(data)
                if(!data){
                    res.status(404).json({
                        message: 'Wrong Email/Password'
                    })
                }else{
                    let plain = req.body.password
                    let hash = data.password
                    let compare = comparePassword(plain, hash)
                    console.log(compare)

                    if(!compare){
                        res.status(404).json({
                            message: 'Wrong Email/Password'
                        })
                    }else{
                        let token = jwt.sign({
                            id: data._id,
                            name: data.name,
                            email: data.email
                        }, process.env.JWT_SECRET)
                        req.headers.token = token
                        res.status(200).json({
                            token: token,
                            message: 'Login Success'
                        })
                    }
                }
            })
            .catch(next)
    }

    static getData(req,res,next){
        console.log(req.headers)
        User.find()
            .then(results => {
                res.status(200).json(results)
            })
            .catch(next)
    }
}

module.exports = UserController