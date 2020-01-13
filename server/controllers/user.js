"use strict"

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE)
const mailer = require('../helpers/mailer')

class UserController {
    static register(req, res, next) {
        const { email, password, fullname } = req.body
        User.create({
            email,
            password,
            fullname
        })
            .then((user) => {
                res.status(201).json(user)
            }).catch((err) => {
                next(err)
            });
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(data => {
                const { email, password, fullname, _id } = data
                if (data === null) {
                    next({
                        status: 400,
                        message: 'username/password wrong'
                    })
                } else {
                    const checkPwd = checkPassword(req.body.password, data.password)
                    if (!checkPwd) {
                        next({
                            status: 400,
                            message: 'username/password wrong'
                        })
                    } else {
                        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
                        mailer(req.body.email)
                        res.status(200).json({
                            _id,
                            email,
                            password,
                            fullname,
                            token
                        })
                    }
                }
            }).catch((err) => {
                next(err)
            });
    }

    static loginGoogle(req, res, next) {
        let payload = null
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID_GOOGLE
        })
            .then((data) => {
                payload = data.getPayload()
                return User.findOne({
                    email: payload.email,
                    id: payload.id
                })
            })
            .then((user) => {
                if (user) {
                    let accessToken = jwt.sign({
                        email: payload.email
                    }, process.env.JWT_SECRET)
                    res.status(200).json({ accessToken, user })
                } else {
                    return User.create({
                        email: payload.email,
                        password: ~~(Math.random() * 99999) + 1,
                        fullname: payload.name,
                        picture: payload.picture
                    })
                }
            })
            .then((user) => {
                let accessToken = jwt.sign({
                    email: payload.email
                }, process.env.JWT_SECRET)
                mailer(payload.email)
                res.status(200).json({ accessToken, user })
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = UserController