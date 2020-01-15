'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { hashPassword, checkPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
        validate: {
            validator: (value) => {
                return users.findOne({ username: value })
                    .then(user => {
                        return !user
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            message: props => `username ${props.value} has been used, please try another username!`
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        validate: {
            validator: (value) => {
                return users.findOne({ email: value })
                    .then(user => {
                        return !user
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            message: props => `email address ${props.value} has been used, please try another email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    about: {
        type: String,
        required: true,
        default: 'No Description Provided!',
        trim: true,
        minlength: 2,
        maxlength: 1000

    }
}, { versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.pre('findOneAndUpdate', function (next) {
    console.log(this._update.$set.password)
    this._update.$set.password = hashPassword(this._update.$set.password)
    next()
})

const users = mongoose.model('Users', userSchema)

module.exports = users