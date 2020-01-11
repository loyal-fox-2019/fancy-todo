const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hashPassword} = require('../helpers/hashPassword');

const oauthSchema = new Schema({
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

oauthSchema.pre('save', function(next) {
    this.password = hashPassword(this.password);
    next();
});

const oauthModel = mongoose.model('oauth', oauthSchema);

module.exports = {
    oauthModel
};
