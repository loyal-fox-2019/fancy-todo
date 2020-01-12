const User = require('../models/User');

class userController {
    static signup (req, res, next) {
        const {email, password} = req.body;
        User.create({email, password})
        .then((result) => {
            res.status(201);
            res.json({result});
        }).catch((err) => {
            res.status(403);
            res.json(err);
        });
    }
}

module.exports = userController;