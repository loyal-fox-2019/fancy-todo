'use strict'

const userModel = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController {

    static signUp(req, res, next) {
        const userRegisterData = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        userModel.create(userRegisterData)
            .then(user => {
                res.status(201).json({
                    message: `signup success`,
                    user: {
                        userID: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        registred: user.createdAt
                    }
                })
            })
            .catch(next)
    }

    static signIn(req, res, next) {

        if (!req.body.identity || !req.body.password) {
            console.log(`sign in`)
            next({
                code: 400,
                name: 'LoginError',
                message: `Username/Email & Password Must Be Provided!`
            })
        }
        else {
            userModel.findOne({
                $or: [
                    { username: req.body.identity },
                    { email: req.body.identity }
                ]
            })
                .then(user => {
                    if (!user || !bcrypt.checkPassword(req.body.password, user.password)) {
                        next({
                            code: 400,
                            name: 'LoginError',
                            message: `Invalid Username/Email & Password Combination!`
                        })
                    }
                    else if (bcrypt.checkPassword(req.body.password, user.password)) {
                        const payload = {
                            userID: user._id,
                            name: user.name,
                            email: user.email,
                        }
                        res.status(200).json({
                            message: `Signin Success`,
                            access_token: jwt.generateToken(payload)
                        })
                    }
                })
                .catch(next)
        }

    }

    static googleSignin(req, res, next) {
        let gPayload = ''
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const userid = payload['sub']
            return payload
        }
        verify()
            .then(payload => {
                gPayload = payload
                console.log(gPayload.email)
                return userModel.findOne({ email: gPayload.email })
            })
            .then(user => {
                console.log(user);
                if (user) {
                    const payload = {
                        userID: user._id,
                        name: user.name,
                        email: user.email,
                    }
                    res.status(200).json({
                        message: `Signin Success`,
                        access_token: jwt.generateToken(payload)
                    })
                }
                else {
                    const userRegisterData = {
                        name: gPayload.name,
                        email: gPayload.email,
                        username: gPayload.name + gPayload.sub,
                        password: Math.random().toString(36).substring(2, 15)
                    }
                    userModel.create(userRegisterData)
                        .then(user => {
                            const payload = {
                                userID: user._id,
                                name: user.name,
                                email: user.email,
                            }
                            res.status(200).json({
                                message: `Signin Success`,
                                access_token: jwt.generateToken(payload)
                            })
                        })
                        .catch(next)

                }
            })
            .catch(next)
    }

    static getProfile(req, res, next) {
        userModel.findById(req.decode.userID)
            .then(user => {
                res.status(200).json({
                    message: `success`,
                    profile: {
                        userID: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        about: user.about,
                        registred: user.createdAt,
                        lastUpdate: user.updatedAt
                    }
                })
            })
            .catch(next)
    }

    static updateProfile(req, res, next) {
        const userProfileData = {
            name: req.body.name,
            about: req.body.about
        }
        userModel.findOneAndUpdate({ _id: req.decode.userID }, userProfileData, { runValidators: true, new: true })
            .then(user => {
                res.status(200).json({
                    message: `update profile success`,
                    profile: {
                        userID: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        about: user.about,
                        registred: user.createdAt,
                        lastUpdate: user.updatedAt
                    }
                })
            })
            .catch(next)
    }

    static changePassword(req, res, next) {
        userModel.findOneAndUpdate({ _id: req.decode.userID }, { $set: { password: req.body.password } }, { runValidators: false, new: true })
            .then(user => {
                res.status(200).json({
                    message: `update profile success`,
                    profile: {
                        userID: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        about: user.about,
                        registred: user.createdAt,
                        lastUpdate: user.updatedAt
                    }
                })
            })
            .catch(next)
    }

    static changeEmail(req, res, next) {
        userModel.findOneAndUpdate({ _id: req.decode.userID }, { email: req.body.email }, { runValidators: true, new: true })
            .then(user => {
                res.status(200).json({
                    message: `update profile success`,
                    profile: {
                        userID: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        about: user.about,
                        registred: user.createdAt,
                        lastUpdate: user.updatedAt
                    }
                })
            })
            .catch(next)
    }

    static getUserProfile(req, res, next) {
        userModel.findOne({ _id: req.params.userID })
            .then(user => {
                if (!user) {
                    next({
                        code: 404,
                        message: 'user not found'
                    })
                }
                else {
                    res.status(200).json({
                        message: `Success`,
                        profile: {
                            userID: user._id,
                            name: user.name,
                            email: user.email,
                            username: user.username,
                            about: user.about,
                            registred: user.createdAt,
                            lastUpdate: user.updatedAt
                        }
                    })
                }
            })
            .catch(next)
    }
}

module.exports = UserController