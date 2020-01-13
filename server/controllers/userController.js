const { OAuth2Client } = require('google-auth-library')
// const  axios = require('axios')
// const compare = require('../helper/bcryptCompare')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const toDos = require('../models/toDo')
const comparePass = require('../helpers/bcryptCompare')

class UserController {
    static googleLogin(req, res, next) {
        let googlePayload
        let userPayload = {}
        let token
        // console.log('masuk controller')
      const clientId = process.env.CLIENT_ID
      const client = new OAuth2Client(clientId)
      client.verifyIdToken({
          idToken: req.body.idToken,
          audience: clientId
      })
        .then(ticket => {
            googlePayload = ticket.getPayload()
             return user.findOne({email: googlePayload.email})
        })
        .then(userData=>{
            // console.log('USER DATA=====>',data)
            if(userData){
                userPayload.id = userData._id
                userPayload.name = userData.name
                userPayload.toDos = userData.toDos
                token = jwt.sign(userPayload, process.env.JWT_SECRET)
                return
            }else{
                return user.create({
                    name: googlePayload.name,
                    email: googlePayload.email,
                    password: process.env.DEFAULT_PASS
                })
            }
        })
        .then(createdData=>{
            if(createdData){
                userPayload.id = createdData._id
                userPayload.name = createdData.name
                token = jwt.sign(userPayload, process.env.JWT_SECRET)
            }
            return toDos.find({
                userId : userPayload.id
            })
        })
        .then(toDosData=>{
            // console.log(toDosData)
            res.status(200).json({toDosData, token})
        })
        .catch(err=>{
            next('Login Failed')
            // console.log(err)
        })
    }

    static create(req, res, next){
        // console.log(req.body)
        let payload = {}
        let token
        user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(userData=>{
            // console.log('ini create')
            payload.id = userData._id
            payload.name = userData.name
            token = jwt.sign(payload, process.env.JWT_SECRET)
            // console.log('INI TOKEN ====>', token)
            res.status(201).json({token, name:payload.name})
        })
        
        .catch(err=>{
            next('Registration failed')
        })
    }

    static webLogin(req, res, next){
        let payload = {}
        let token
        user.findOne({email:req.body.email})
        .then(userData=>{
            if(!userData){
                res.status(404).json('Wrong email or password')
            }
            payload.id = userData._id
            payload.name = userData.name
            return comparePass(req.body.password, userData.password)
        })
        .then(result=>{ //password compare result
            // console.log(result)
            if(!result){
                res.status(403).json('Wrong email or password')
            }
            token = jwt.sign(payload, process.env.JWT_SECRET)
            return
        })
        .then(tokenGenerated=>{
            return toDos.find({userId:payload.id})
        })
        .then(toDosData=>{
            // console.log(`Udah masuk sini`)
            res.status(200).json({token, toDosData, name:payload.name})
        })
        .catch(err=>{
            next('Login Failed')
        })
    }
}

module.exports = UserController