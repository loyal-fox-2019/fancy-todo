"use strict"

const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Required Email"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid Email'],
        validate: {
            validator: function (v) {
                return User.findOne({ email: v })
                    .then((result) => {
                        if (result) {
                            return false
                        } else {
                            return true
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
            },
            message: "Email address already registered"
        }
    },
    password: {
        type: String,
        required: [true, "Required Password"]
    },
    fullname: {
        type: String,
        maxlength: [25, "Max fullname 25"],
        required: [true, "Required Your fullname"]
    },
    picture: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hashPassword(this.password)
    }
    next();
});

const User = mongoose.model("User", userSchema)
module.exports = User