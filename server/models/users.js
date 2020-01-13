'use strict'

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `name is required`]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, `password is required`]
    }
})

userSchema.pre('save', function(next) {
    const saltRounds = 8;
    const hash = bcrypt.hashSync(this.password, saltRounds)
    this.password = hash
    next()
})
module.exports = mongoose.model('Users', userSchema)