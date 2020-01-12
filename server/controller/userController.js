const User = require('../models/userModel');
const jwt = require('../helpers/jwt');
const {verifier} = require('../helpers/bcrypt');

class UserController{
    static create(req,res,next){
        if(req.body.email === "admin"){
            next('create-admin')
            return
        }
        User.findOne({
            email : req.body.email
        })
        .then(response =>{
            if(response){
                console.log(`${response.email} already exist`)
                next('user-exist')
            }
            else{
                User.create({
                    email : req.body.email,
                    password : req.body.password,
                    name : req.body.name
                })
                .then(newUser =>{
                    res.status(201).json({message : "created User", newUser })
                })
                .catch(err =>{
                    next(err)
                })
            }
        })
    }

    static signin(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(response =>{
            if(!response){
                console.log('user gak ada')
                next('user-not-found')
            } else{
                if(verifier(req.body.password,response.password)){
                    let token = jwt.generator(response.email)
                    console.log(token)
                    res.status(200).json(token)
                }
                else{
                    next('wrong-password')
                }
            }
        })
        .catch(err =>{
            next("internal-server")
        })
    }
    
    static google(req,res,next){
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
        const ticket = client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENTID,  
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            User.findOne({
                email : payload.email
            })
            .then(user=>{
                if(user){
                    return user
                } else {
                    return User.create({
                        email : payload.email,
                        password : process.env.DEFAULT_PASSWORD,
                        name : payload.name
                    })
                }
            })
            .then(user =>{
                let token = jwt.generator(user.email)
                res.status(200).json(token)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController

