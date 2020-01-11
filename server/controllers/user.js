"use strict"

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')

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
        console.log(req.body)
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
                    console.log(checkPwd)
                    if (!checkPwd) {
                        next({
                            status: 400,
                            message: 'username/password wrong'
                        })
                    } else {
                        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
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

    // static loginGoogle(req, res, next) {

    // }
}

module.exports = UserController