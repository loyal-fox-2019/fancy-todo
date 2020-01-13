"use strict"

const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

class UserCtr {
    static register(req, res, next) {
        let password = req.body.password;

        bcrypt.hash(password, saltRounds)
        .then((hash) => {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            .then((user) => {
                res.status(201).json(user)
            })
        })
        .catch(next);
    }
    
    static login(req, res, next) {
        let password = req.body.password;

        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            bcrypt.compare(password, user.password)
            .then((result) => {
                if (result) {
                    jwt.sign({user}, process.env.PRIVATE_KEY, function(err, token) {
                        if(token) {
                            res.json({token})
                        } else {
                            res.json({err})
                        }
                    })
                } else {
                    res.status(401).json({error: {
                        message: "incorrect email/password"
                    }})
                }
            })
        })
        .catch(next)
    }
}

module.exports = UserCtr;