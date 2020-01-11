const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hash = require('../helpers/encryption')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'please provide username'],
        min: [6, "please provide username withing 6-10 characters"],
        max: [10, "please provide username withing 6-10 characters"]
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        min: [6, "please provide password withing 6-10 characters"],
        max: [10, "please provide password withing 6-10 characters"]
    },
    email: {
        type: String,
        required: [true, "please input your email"],
        validate: [{
            validator: function (val) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
            },
            message: hasil => `${hasil.value} is not a valid email!`
        }, {
            validator: function () {
                return new Promise((res, rej) => {
                    User.findOne({ email: this.email })
                        .then(data => {
                            if (data) {
                                res(false)
                            } else {
                                res(true)
                            }
                        })
                        .catch(err => {
                            res(false)
                        })
                })
            }, message: 'email already taken!'
        }]
    }
})

userSchema.pre("save", function () {
    let hashedPass = hash(this.password)
    this.password = hashedPass
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User