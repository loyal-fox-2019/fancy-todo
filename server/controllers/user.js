const User = require('../models/user');

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
        const user = req.headers.user
        console.log(req.headers);

        const generateToken = require('../helpers/generateToken');
        const token = generateToken(user)
        res.status(200).json({
            status: 200,
            token
        })
    }
}

module.exports = {
    UserController
};
