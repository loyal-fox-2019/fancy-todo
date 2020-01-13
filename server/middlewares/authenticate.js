const User = require('../models/user');

function authenticate(req, res, next) {
    const password = req.body.password
    let user
    User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    })
        .then((userData) => {
            const bcrypt = require('bcrypt');
            user = userData
            return bcrypt.compare(password, user.password)
        })
        .then((result) => {
            if (!result) {
                res.status(401).json({
                    status: 401,
                    msg: 'Incorrect email/username or password'
                })
            } else {
                req.headers.user = user
                next()
            }
        })
        .catch((err) => {
            next(err)
        });
}

module.exports = authenticate
