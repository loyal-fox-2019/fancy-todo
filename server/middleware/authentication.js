"use strict"

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function auth(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            User.findById(decoded.id)
                .then((result) => {
                    req.user = {
                        _id: result._id,
                        email: result.email,
                        fullname: result.fullname
                    }
                    next()
                }).catch((err) => {
                    next(err)
                });
        }
        catch{
            next({
                status: 400,
                message: "not found token"
            })
        }
    } else {
        next({
            status: 403,
            message: "you are not login"
        })
    }
}

module.exports = auth