const Model = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

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
}

module.exports = UserController