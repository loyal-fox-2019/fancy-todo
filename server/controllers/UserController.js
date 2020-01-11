'use strict';

const User = require('../models/user');
const Bcrypt = require('../helper/bcrypt');
const jwt = require('../helper/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('724269325086-275h1fjnre39u0qm2cq6n5ko3nf1b8c4.apps.googleusercontent.com')

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json({
                message: "OK",
                data: user
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static privateLogin(req, res, next) {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                throw {
                    name: "NotFound",
                    message: "User Not Found"
                }
            } else {
                const passwordValidation = Bcrypt.comparePassword(req.body.password, user.password);
                if(!passwordValidation) {
                    throw {
                        name: "BadRequest",
                        message: "Wrong Email/Password"
                    } 
                } else {
                    const userToken = jwt.generateToken(user.id)
                    res.status(200).json({
                        userToken
                    })
                }
            }
        })
        .catch(error => {
            next(error);
        })
    }

    static openLogin(req, res, next) {
        let newUser = null
        client.verifyIdToken({
            idToken: req.body.g_token,
            audience: '724269325086-275h1fjnre39u0qm2cq6n5ko3nf1b8c4.apps.googleusercontent.com'
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            newUser = {
                email: payload.email
            }
            return User.findOne({email: payload.email})
        })
        .then(user => {
            if(!user) {
                newUser.password = 'apaajaboleh'
                return User.create(newUser);
            } else {
                return user
            }
        })
        .then(userAft => {
            const userToken = jwt.generateToken(userAft.id);
            res.status(201).json({
                message: "OK",
                data: userToken
            })
        })
        .catch(error => {
            next(error)
        })
    }
} 

module.exports = UserController;