const modelUser = require('../models/modelUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../helpers/verifyToken')

class ControlUser {
    static register(req, res, next) {
        // res.status(200).json(req.body)
        modelUser.find({ username: req.body.username })
            .then(resultPencarian => {
                if (resultPencarian[0]) {
                    console.log("ada nih username")
                    console.log(resultPencarian)
                    res.status(400).json({ message: "username is already used" })
                } else {
                    // console.log("ok gaada")
                    return modelUser.create(req.body)

                }
            })
            .then(userTerdaftar => {
                console.log(userTerdaftar, "ini data username yang baru register")
                // console.log(userTerdaftar)
                const token = jwt.sign({ id: userTerdaftar._id }, process.env.JWT_SECRET)
                console.log(token, "ini token, user logged in")

                req.headers.token = token
                res.status(200).json({ userTerdaftar, message: "registered successfully", token })

            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error from register" })
            })
    }

    static login(req, res, next) {
        let dataUser
        modelUser.findOne({ username: req.body.username })
            .then(userNameFound => {
                if (!userNameFound) {
                    console.log("tidak ada usernamenya")
                    res.status(400).json({ message: "username/password is wrong" })
                } else {
                    console.log(userNameFound, "ada usernamenya")
                    dataUser = userNameFound
                    const cocokPass = bcrypt.compareSync(req.body.password, userNameFound.password)
                    // console.log(cocokPass, "ini cocokpas")
                    if (cocokPass) {
                        const token = jwt.sign({ id: userNameFound.id }, process.env.JWT_SECRET)
                        console.log(token, "ini token, user logged in")

                        req.headers.token = token
                        res.status(200).json({ cocokPass, message: "registered successfully", token, dataUser })

                    } else {
                        console.log("gagal ini di controlUser Login setelah cek username")
                        res.status(400).json({ message: "username/password is wrong" })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error from login" })
            })
    }

    static google(req, res, next) {
        let email
        let username
        console.log("halo dari google controller")
        // console.log(req.body.idtoken)
        const tokenGoogle = req.body.idtoken
        const payload = verifyToken(tokenGoogle)
        // console.log(payload)
        payload.then(data => {
            console.log('controller google')
            // console.log(data)
            email = data.email
            username = data.name
            return modelUser.findOne({
                email
            })
        })
            .then(result => {
                if (result) {
                    return result
                } else {
                    console.log("halo dari google controller setelah findUser kalo ga ketemu")
                    return modelUser.create({
                        username: username,
                        email,
                        password: process.env.USER_PASSWORD
                    })
                }
                // console.log(result)
            })
            .then(user => {
                console.log(user, "ini usernya")
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                console.log(token, "ini token, user logged in")

                req.headers.token = token
                // res.send(user)
                res.status(200).json({ user, token })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ err, message: "Internal Server error from googlecontrol" })
            })

    }

}

module.exports = ControlUser