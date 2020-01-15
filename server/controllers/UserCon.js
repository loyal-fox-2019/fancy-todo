'use strict'

const User = require('../models/user')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const customPass = require('../helpers/randomPassword')

class UserCon {

    static register (req, res, next){
    const {email,password} = req.body
    User.create({email,password})
    .then(user=>{
        let token = generateToken(user)  
        let {email,_id} = user
                    res.status(201).json({
                        message : 'register succes',
                        token : token,
                        user : {
                            email,
                            _id
                        }                        
                    })
    })
    .catch(err=>{
        next(err)
    })
    }

    static login(req,res,next){
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {       
            if (user) {     
                let valid = comparePassword(req.body.password,user.password)
                if ( valid ) {               
                    let token = generateToken(user)  
                    let {email,_id} = user
                    res.status(200).json({
                        message : 'login succes',
                        token : token,
                        user : {
                            email,
                            _id
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    message : 'user not found'
                })
            } 
        })
        .catch(next)
    }

    static findAll(req, res, next){
        User.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static loginGoogle(req, res, next) { 
        const { email} = req.decoded
        User.findOne({email})
        .then(user =>{
            if(user){
                return user
            }else{
                return User.create({
                    email : email,
                    password: customPass
                })
            }
        })
        .then(user =>{
            const token = generateToken(user)
            res.status(200).json({
                message: 'login success',
                token: token,
                user: {
                    email : user.email,
                    id: user._id
                }
            })
        })
        .catch(err =>{
            next(err)
        })               
    }    

    static find(req,res,next){
        res.status(200).json(req.user)
    }
}

module.exports = UserCon