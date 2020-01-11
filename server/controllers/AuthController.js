const User = require('../models/User')
const {checkPassword} = require('../helpes/bcrypt')
const jwt = require('jsonwebtoken')
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
}

module.exports = AuthController