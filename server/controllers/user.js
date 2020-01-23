const {userModel} = require('../models/user');
const ObjectId = require('mongoose').ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    static login(req, res, next) {
        const {username, password} = req.body;
        userModel.findOne({
            $or: [
                { username: username }, 
                { email: username } 
            ]
        })
            .then((user) => {
                if (!user) {
                    let errors = new Error('User does not exist');
                    errors.status = 404;
                    errors.data = user;
                    throw errors;
                } else {
                    const comparePassword = bcrypt.compareSync(password, user.password);
                    if (!comparePassword) {
                        let errors = new Error('Incorrect username or password');
                        errors.status = 404;
                        errors.data = user;
                        throw errors;
                        // res.status(200).json({
                        //     user,
                        //     msg: 'Incorrect username or password'
                        // })
                    } else {
                        const token = jwt.sign({
                            id: user._id,
                            name: user.username,
                            email: user.email
                        }, process.env.CLIENT_SECRET);

                        res.status(200).json({token, name: user.username});
                    }
                }
            }).catch(next);
    }

    static register(req, res, next) {
        userModel.findOne({
            $or: [
                { username: req.body.username }, 
                { email: req.body.email } 
            ]
        })
            .then((registered) => {
                if (registered) {
                    let errors = new Error('Email or username already exist');
                    errors.status = 403;
                    errors.data = registered;
                    throw errors;
                    // res.status(200).json({
                    //     registered,
                    //     msg: 'Email or username already exist'
                    // })
                } else {
                    return userModel.create({
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name,
                        email: req.body.email
                    });
                }
            }).then((user) => {
                res.status(201).json({user, msg: "Registration Success"});
            })
            .catch(next);
    }
}

module.exports = {
    UserController
};
