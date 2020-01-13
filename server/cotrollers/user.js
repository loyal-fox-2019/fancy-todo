'use strict'

const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class userController {
    static signup(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            res.status(201).json({
                user
            })
        })
        .catch(next)
    }
    static signin(req, res, next) {
        console.log(req.body.email, req.body.password)
        User.findOne({ email: req.body.email })
        .then(result => {
            console.log(result)
            if(!result) {
                throw {status:404, message: 'username/password false'}
            } 
            else {
                const password = bcrypt.compareSync(req.body.password, result.password)
                if(!password) {
                    throw {status:404, message: 'username/password false'}
                }
                else {
                    const token = jwt.sign({userId: result.id}, process.env.KEY_TOKEN ,{expiresIn: '1h'})
                    res.status(200).json({token})
                }
            }
        })
        .catch(next)
    }
    static update(req, res, next) {
        // const id = 
    }
}

module.exports = userController