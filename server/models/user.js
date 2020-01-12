const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hashPassword} = require('../helpers/hashPassword');

const userSchema = new Schema({
    userId: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password);
    next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel
};
