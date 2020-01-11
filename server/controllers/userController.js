const { OAuth2Client } = require('google-auth-library')
// const  axios = require('axios')
// const compare = require('../helper/bcryptCompare')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const toDos = require('../models/toDo')

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
                userPayload.toDos = createdData.toDos
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
            // console.log(err)
        })
    }

    static create(req, res, next){
        user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(userData=>{
            res.status(201).json(userData)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController