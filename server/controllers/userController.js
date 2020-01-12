'use strict'

class UserController {

    static signUp(req, res, next) {
        res.send('User Signup!')
    }

    static signIn(req, res, next) {
        res.send('Register User!')
    }

    static getProfile(req, res, next) {
        res.send('get profile')
    }

    static getUserProfile(req, res, next) {
        res.send('get user profile')
    }

    static updateProfile(req, res, next) {
        res.send(`update Profile`)
    }

    static changePassword(req, res, next) {
        res.send('change password')
    }

    static changeEmail(req, res, next) {
        res.send('change email')
    }

    static emailActivation(req, res, next) {
        res.send('email activation')
    }
}

module.exports = UserController