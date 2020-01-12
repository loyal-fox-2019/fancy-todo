'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('../helper/bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field cannot be empty'],
        validate: {
            validator: function(value) {
                return User.findOne({email: value})
                .then(user => {
                    if(user === null) {
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            message: 'Email already been used'
        }
    },
    password: {
        type: String,
        required: [true, 'Password field cannot be empty']
    }
})

userSchema.pre('save', function(next) {
    this.password = Bcrypt.hashPassword(this.password);
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;