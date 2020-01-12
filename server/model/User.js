const mongoose = require('mongoose')
const { generateHash } = require('../helper/bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format'],
        minlength: [6, 'Minimum password is 6 characters'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    }
})



userSchema.pre('save', function(next){
    this.password = generateHash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User