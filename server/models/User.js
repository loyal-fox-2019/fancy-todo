const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashedPassword } = require('../helpes/bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

userSchema.pre('save', function(next) {
    this.password = hashedPassword(this.password)
    console.log(this.password)
    next();
});

const User = mongoose.model('User', userSchema)
module.exports = User
