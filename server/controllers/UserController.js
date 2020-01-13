'use strict';

const User = require('../models/user');
const bcrypt = require('../helpers/bcrypt');
const { generateToken } = require('../middlewares/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_TOKEN);

class UserController {
    static register(req, res, next) {
        User.findOne({
            username: req.body.username
        })
        .then(user => {
            if(user) {
                res.status(404).json({
                    message: 'Username already exist'
                });
            } else {
                return User.create({
                    username: req.body.username,
                    password: req.body.password
                });
            }
        })
        .then(user => {
            res.status(201).json({
                data: user.username,
                message: 'Successfully registered user'
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static login(req, res, next) {
        User.findOne({
            username: req.body.username
        })
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: 'Username/Password wrong'
                });
            } else {
                if(bcrypt.compareHash(req.body.password, user.password)) {
                    const token = generateToken(user.username);
                    res.status(201).json({
                        message: 'Login success',
                        data: {
                            username: user.username,
                            token: token
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'Username/Password wrong'
                    });
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

    static googleSignIn(req, res, next) {
        let email = null;
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_TOKEN
        })
        .then(ticket => {
            email = ticket.payload.email;
            return User.findOne({
                username: email
            });
        })
        .then(user => {
            if(user) {
                return user;
            } else {
                return User.create({
                    username: email,
                    password: 'default'
                });
            }
        })
        .then(user => {
            const token = generateToken(user);
            res.status(200).json({ token });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }
}

module.exports = UserController;
