const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const generateToken = require('../helpers/generateToken');

class UserController {
    static registrate(req, res, next) {
        User.create(req.body)
            .then((result) => {
                res.status(201).json({
                    msg: 'Registration Success',
                    result
                })
            }).catch((err) => {
                next({
                    status: 400,
                    err
                })
            });
    }

    static login(req, res, next) {
        const loginPassword = req.body.password
        let user
        User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })
            .then((userData) => {
                if (!userData) {
                    throw new Error({
                        status: 400,
                        msg: 'Username or email not found'
                    })
                } else {
                    const bcrypt = require('bcrypt');
                    user = userData
                    return bcrypt.compare(loginPassword, user.password)
                }
            })
            .then((result) => {
                if (!result) {
                    res.status(401).json({
                        status: 401,
                        msg: 'Incorrect email/username or password'
                    })
                } else {
                    req.headers.user = user
                    const token = generateToken({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt
                    })
                    res.status(200).json({
                        status: 200,
                        token
                    })
                }
            })
            .catch((err) => {
                next(err)
            });
    }

    static gSignIn(req, res, next) {
        const clientId = process.env.G_CLIENT_ID
        const client = new OAuth2Client(clientId);
        let payload
        let gUser
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: clientId
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                return User.findOne({ email: payload.email })
            })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        email: payload.email,
                        username: payload.given_name + payload.family_name,
                        password: process.env.G_SIGN_DEF_PASSWORD
                    });
                }
            })
            .then((newUser) => {
                const token = generateToken({
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt
                });
                res.status(201).json({
                    status: 201,
                    token
                })
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = {
    UserController
};
