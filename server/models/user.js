const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username cannot be null'],
        minlength: [6, 'Minimum Username Character : 6']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email cannot be null'],
        validate:
        {
            validator: function (value) {
                let RegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return RegEx.test(value)
            },
            message: `Email format Incorect`
        }
    },
    password: {
        type: String,
        required: [true, 'Password cannot be null']
    }
})
userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User