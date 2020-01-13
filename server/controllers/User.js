const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class {
    static createUser(req, res, next) {
        User.findOne({ email: req.body.email })
            .exec()
            .then(data => {
                if (data) {
                    return res.status(409).json({
                        message: 'mail exist'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            next
                        } else {
                            User.create({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            }, (err, data) => {
                                if (err) {
                                    next
                                } else {
                                    res.status(200).json(data)
                                }
                            })
                        }
                    })
                }
            })
    }

    static findAll(req, res, next) {
        User.find({}, (err, docs) => {
            if (err) {
                res.send('sory error')
            } else {
                // console.log(docs);
                // res.send(docs)
                console.log(req);
                res.status(200).json(req)
            }
        });
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .exec()
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'Auth failed first' })
                } else {
                    bcrypt.compare(req.body.password, user.password, (err, data) => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Auth failed here'
                            })
                        } else {
                            if (data) {
                                const token = jwt.sign({
                                    email: user.email,
                                    userId: user._id
                                }, 'secret', 
                                {
                                    expiresIn: '1h'
                                })
                                return res.status(200).json({
                                    message: 'Auth successfull',
                                    token: token
                                })
                            }
                            res.status(401).json({
                                message: 'Not Authorized'
                            })
                        }
                        res.status(401).json({
                            message: 'Auth Failed'
                        })
                    })
                }
            })
            .catch()
    }
}