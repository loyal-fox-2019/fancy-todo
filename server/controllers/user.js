const Model = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        Model.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(created => {
                res.status(201).json(created)
            })
            .catch(err => {
                let errStatus
                if (err.name === 'ValidationError') {
                    errStatus = {
                        code: 400,
                        status: 'Bad Request',
                        message: err.message

                    }
                    next(errStatus)
                } else {
                    errStatus = {
                        code: 409,
                        status: 'Conflict',
                        message: 'Username/Email has been registered'
                    }
                    next(errStatus)
                }

            })
    }
    static login(req, res, next) {
        Model.findOne({
            username: req.body.username
        })
            .then(user => {
                const err = {
                    code: 400,
                    status: 'Bad Request',
                    message: 'incorrect username/password'
                }
                if (user) {
                    const compare = comparePassword(req.body.password, user.password)
                    if (compare) {
                        const token = generateToken({
                            userId: user._id,
                            username: user.username,
                        })
                        res.status(200).json(token)
                    } else {
                        throw err
                    }
                } else {
                    throw err
                }
            })
            .catch(next)
    }
    static loginGoogle(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let payload =
            client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
                .then(ticket => {
                    payload = ticket.getPayload()
                    return Model.findOne({ email: payload.email })
                })
                .then(user => {
                    if (user) {
                        const token = generateToken({ userId: user._id, username: user.username });
                        res.status(200).json(token);
                    } else {
                        return Model.create({
                            email: payload.email,
                            username: payload.given_name + payload.iat,
                            password: process.env.PASSWORD_GSIGN
                        });
                    }
                })
                .then(created => {
                    if (created) {
                        const token = generateToken({ userId: created._id, username: created.username })
                        res.status(200).json(token)
                    }
                })
                .catch(next)
    }
}

module.exports = UserController