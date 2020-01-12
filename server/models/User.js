const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateEmail = require('../helpers/validateEmail');
const hasher = require('../helpers/hasher');

mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: "Password is required"
    }
});

userSchema.pre("save", function (next) {
    if (!this.isModified('password')) return next();
    else {
        this.password = hasher(this.password);
        next();
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;