const User = require('../models/users')
const { genToken } = require('../helpers/jwt')
const { dehash } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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

        User.findOne(query).populate('invitation', 'name')
            .then((user) => {
<<<<<<< HEAD
		console.log(user)
                if (!user) next({ status: 404, msg: 'User tidak ditemukan' })
=======
                if (!user) throw ({ status: 404, msg: 'User tidak ditemukan' })
>>>>>>> b1f981338ca976cfde40060848d788bf5c1a1d73

                let isPassword = dehash(password, user.password)
                if (isPassword) {
                    let tokenData = { id: user._id, name: user.name }
                    let token = genToken(tokenData)
                    res.status(200).json({ token, name: user.name, invitation: user.invitation })
                }
                else {
                    throw ({ status: 400, msg: 'Password salah' })
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

    static getInvitation(req, res, next) {
        User.findById(req.decoded.id).populate('invitation')
            .then((result) => {
                res.status(200).json(result.invitation)
            }).catch(next);
    }

    static async googleSignIn(req, res, next) {
        let data;
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        // data = {
        //     email: ticket.email,
        //     name: ticket.name,
        //     password: ticket.email
        // }
        User.findOne({ email: ticket.getPayload().email })
            .then((user) => {
                if (!user) {
                    // console.log(data);
                    User.create({
                        email: ticket.getPayload().email,
                        name: ticket.getPayload().name,
                        password: ticket.getPayload().email
                    })
                        .then((result) => {
                            let tokenData = { id: result._id, name: result.name }
                            let token = genToken(tokenData)
                            res.status(201).json({ token, name: result.name, invitation: result.invitation })
                        }).catch(next);
                } else {
                    let tokenData = { id: user._id, name: user.name }
                    let token = genToken(tokenData)
                    res.status(200).json({ token, name: user.name, invitation: user.invitation })
                }
            })
            .catch(next);
        const payload = ticket.getPayload();
        console.log(payload)
    }
}

module.exports = Controller
