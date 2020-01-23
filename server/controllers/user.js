const User = require('../models/user')
const jwt = require('jsonwebtoken')
const comparePassword = require('../helpers/comparePassword')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

    static gSign(req,res,next){
        let payload = null
        let regData = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                regData = {
                    name: payload.name,
                    email: payload.email,
                    password: process.env.DEFAULT_PASS
                }
                return User.findOne({email: regData.email})
            })
            .then(data => {
                if(data===null){
                    return User.create(regData)
                }else{
                    let token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        email: data.email
                    }, process.env.JWT_SECRET)
                    req.headers.token = token
                    res.status(200).json({
                        message: 'Login Success',
                        token: token,
                        id: data._id
                    })
                }
            })
            .then(data => {
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
                        console.log('masuk sini')
                        let token = jwt.sign({
                            id: data._id,
                            name: data.name,
                            email: data.email
                        }, process.env.JWT_SECRET)
                        res.status(200).json({
                            message: 'Login Success',
                            token: token,
                            id: data._id
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
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