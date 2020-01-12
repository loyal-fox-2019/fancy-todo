const User = require('../models/users')
const { genToken } = require('../helpers/jwt')
const { dehash } = require('../helpers/bcrypt')

class Controller {
// checked
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({
            email,
            name,
            password
        })
            .then((user) => {
                let tokenData = { id: user._id, name: user.name }
                let token = genToken(tokenData)
                res.status(201).json({ token, name: user.name, invitation: user.invitation })
            })
            .catch(next);
    }
// checked
    static login(req, res, next) {
        const { userInput, password } = req.body
        let query;
        if (userInput.includes('@')) query = { email: userInput }
        else query = { name: userInput }

        User.findOne(query)
            .then((user) => {
                if (!user) next({ status: 404, msg: 'User tidak ditemukan' })

                let isPassword = dehash(password, user.password)
                if (isPassword) {
                    let tokenData = { id: user._id, name: user.name }
                    let token = genToken(tokenData)
                    res.status(200).json({ token, name: user.name, invitation: user.invitation })
                }
                else {
                    next({ status: 400, msg: 'Password salah' })
                }
            })
            .catch(next);
    }
// checked
    static listUser(req, res, next) {
        User.find()
            .then((users) => {
                res.status(200).json(users)
            })
            .catch(next);
    }

    // static listUserForInvitation(req, res, next){
        
    // }

}

module.exports = Controller