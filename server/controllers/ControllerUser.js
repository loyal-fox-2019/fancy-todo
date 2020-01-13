const {User} = require('../models/modelUser');
const {compareBCrypthash} = require('../helpers/bCrypt');
const {createJWToken} = require('../helpers/jsonWebToken');
const emailSetAndSend = require('../helpers/email');

class ControllerUser {
    static viewUser(req, res, next) {
        if (req.role === 'Admin') {
            User.find().then(response => {
                res.status(200).json({
                    data: response
                });
            }).catch(next)
        } else {
            User.findOne({
                _id: req.user_id
            }).then(response => {
                res.status(200).json({
                    data: response
                });
            }).catch(next)
        }
    }

    static createUser(req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            role: "User"
        }).then(response => {
            res.status(201).json({
                message: "User successfully created",
                data: response
            });
        }).catch(next)
    }

    static login(req, res, next) {
        const errMessage = "User/ password";

        if (!req.body.email || !req.body.password) {
            throw ({
                name: "ValidationError",
                errMsg: "email/ password required"
            })
        }

        User.findOne({
            email: req.body.email
        }).then(response => {
            let isPasswordMatch = compareBCrypthash(
                req.body.password,
                response.password
            );

            if (response && isPasswordMatch) {
                res.status(200).json({
                    token: createJWToken(
                        response._id,
                        response.email,
                        response.role
                    ), email: response.email
                });
            } else {
                throw ({
                    code: 404,
                    errMsg: errMessage
                });
            }
        }).catch(next)
    };

    static loginGoogle(req, res, next) {
        let email = req.userEmail;

        User.findOne({
            email: email
        }).then(response => {
            if (response) {
                res.status(200).json({
                    token: createJWToken(
                        response._id,
                        response.email,
                        response.role
                    ), email: response.email,
                });
            } else {
                let password = Math.random().toString(36);
                User.create({
                    email: email,
                    password: password,
                    role: "User"
                }).then(response => {
                    emailSetAndSend(
                        email,
                        "Fancy TODO - user and password",
                        `Here your account details : 
                        user : ${email}
                        password : ${password}
                        
                        Best regards,
                        Fancy-TODO`
                    );

                    res.status(200).json({
                        token: createJWToken(
                            response._id,
                            response.email,
                            response.role
                        ), email: response.email
                    });
                }).catch(next)
            }
        }).catch(next)
    }

}

module.exports = ControllerUser;