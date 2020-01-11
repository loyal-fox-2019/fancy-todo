const User = require('../models/User')
class UserController {

    static findAll(req, res, next){
        User
            .find()
            .then(users => {
                res
                    .status(200)
                    .json({
                        users
                    })
            })
            .catch(next)
    }

}

module.exports = UserController