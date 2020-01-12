const User = require('../models/User')
class UserController {

    static findAll(req, res, next){
        User
            .find()
            .select('username')
            .then(users => {
                res
                    .status(200)
                    .json({
                        users
                    })
            })
            .catch(next)
    }
    static findOne(req, res, next){
        User
            .findOne({
                _id: req.userId
            })
            .select('username')
            .then(user => {
                res
                    .status(200)
                    .json({
                        user
                    })
            })
            .catch(next)
    }

}

module.exports = UserController