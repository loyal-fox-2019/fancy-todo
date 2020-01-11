const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next){
    let hashedPassword = hashPassword(this.password)
    this.password = hashedPassword

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User