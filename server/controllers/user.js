const UserModel = require('../models/user')
const gVerify = require('../helpers/decodeGoogle')
const { generateJWT, verifyJWT } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class UserController {
    static gLogin(req,res,next){
        let data
        let gtoken = req.body.data.id_token        
        gVerify(gtoken)
        .then(payload=>{
            data = payload
            return UserModel.findOne({
                email: payload.email
            })
        })
        .then(result=>{
            if(result){
                return result
            }
            else {     
                return UserModel.create({
                    name: data.name,
                    email: data.email,
                    password: process.env.DEFAULT_PASS
                })
            }
        })
        .then(user=>{
            let payload = {
                userId: user._id,
                name: user.name,
                email: user.email
            }
            let token = generateJWT(payload)
            res.status(200).json({
                token: token,
                user_data: payload
            })
        })
        .catch(next)
    }

    static login(req,res,next){
        let userData
        UserModel.findOne({
            email: req.body.data.email
        })
        .then(user=>{
            if(user){
                userData = user
                return bcrypt.compare(req.body.data.password, user.password)
            }
            else {
                res.status(400).json({message: "Wrong email/password"})
            }
        })
        .then(result=>{
            if(result){
                let payload = {
                    userId: userData._id,
                    name: userData.name,
                    email: userData.email
                }
                let token = generateJWT(payload)
                let data = {
                    token: token,
                    user_data: payload
                }
                res.send(data)
            }
            else {
                res.status(400).json({message: "Wrong email/password"})
            }
        })
        .catch(next)
    }

    static register(req,res,next){
        let data = req.body.data
        UserModel.findOne({
            email: data.email
        })
        .then(user=>{ 
            if(user){
                res.status(400).json({message: "email already registered"})
            }
            else{
                return UserModel.create(data)
            }
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
}

module.exports = UserController