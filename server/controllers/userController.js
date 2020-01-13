const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {decode} = require('../helpers/encryption')
const verifyGoogleToken = require('../helpers/verifyGoogle')

class UserControlLer{
    static create(req,res,next){
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(result=>{
            res.send({
                message: 'user created',
                result
            })
        })
        .catch(next)
    }
    static delete(req,res,next){
        User.deleteOne({username: req.params.username})
    }
    static login(req,res,next){
        // console.log(req.body)
        let password = null
        if(req.body.hasOwnProperty('password')){
            password = req.body.password
        }else{
            password = process.env.DEFAULT_PASSWORD
        }
        User.findOne({username:req.body.username})
        .then(user=>{
            // console.log(req.body.password, user)
            console.log(user)
            const decoded = decode(password, user.password)
            // console.log(decoded)
            if(decoded){
                // console.log(user)
                const token = generateToken({
                    id: user._id,
                    username: user.username,
                    email:user.email},
                process.env.JWT_TOKEN)
                // localStorage.setItem('token', token)
                // req.session.token = token
                res.status(200).send({
                    message: 'user logged in',
                    token
                })
            }else{
                throw new Error(`${req.body.username} not found`)
            }
        })
        .catch(next)
    }
    static getUsers(req,res,next){
        User.find()
        .then(user=>{
            if(user){
                res.send({user})
            }else{
                throw new Error('User not found')
            }
        })
        .catch(next)
    }
    static gsignin(req,res,next){
        // console.log(req.body)
        const token = req.body.token
        let payload = null
        payload = verifyGoogleToken(req.body.token)
        let username, email;
        payload.then(data=>{
            // console.log(data)
            username = `${data.given_name}${data.family_name}`
            email = data.email
            return User.findOne({email: data.email})
        })
        .then(user=>{
            if(user){
                return user
            }else{
                return User.create({
                    username: username,
                    email: email,
                    password: process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(result=>{
            res.send({
                result
            })
        })
        .catch(next)
    }
}

module.exports = UserControlLer