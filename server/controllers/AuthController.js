const User = require('../models/User')
const {checkPassword} = require('../helpes/bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
class AuthController {
    static signUp(req, res, next) {
        User
            .create({
                username: req.body.username,
                password: req.body.password
            })
            .then(user => {
                console.log(user)
                res.status(201).json({
                    user
                })
            })
            .catch(next)
    }
    static signIn(req, res, next){
        User
            .findOne({
                username: req.body.username
            })
            .then(user => {
                const err = {
                    name: 'ValidationError',
                    message: 'username / password incorrect'
                }
                if (user) {
                    const password = req.body.password
                    const isPassword = checkPassword(password, user.password)
                    if (isPassword) {

                        const token = jwt.sign({ 
                            userId: user._id
                        }, process.env.JWT_SECRET)

                        res.status(200).json({
                            token
                        })
                        
                    }else{
                        throw err    
                    }
                }else{
                    throw err
                }
            })
            .catch(next)
    }
    static github(req, res, next){
        let usernameGithub;
        axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            params: {
                client_id: 'c7ad8dd4b09cb2c4aa21',
                client_secret: process.env.GITHUB_SECRET,
                code: req.params.code
            },
            headers: {
                Accept: 'application/json'
            }
        })
        .then(({data}) => {
            const tokenGithub = data.access_token
            return axios({
                url: 'https://api.github.com/user',
                headers: {
                    Authorization: "token "+tokenGithub,
                    Accept: 'application/json'
                }
            })
        })
        .then(({data}) => {
            // console.log(data.login)
            usernameGithub = data.login
            return User
                    .findOne({
                        username: data.login
                    })
        })
        .then(user => {
            if (user) {
                return user
            }else{
                return User 
                            .create({
                                username: usernameGithub,
                                password: 'githubpw'
                            })
            }
        })
        .then(user => {
            console.log(user._id)
            const token = jwt.sign({
                userId: user._id
            }, process.env.JWT_SECRET)
            res.status(200).json({
                token
            })
        })
        .catch(next)
    }
}

module.exports = AuthController