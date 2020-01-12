const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateEmail = require('../helpers/validateEmail');

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
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;