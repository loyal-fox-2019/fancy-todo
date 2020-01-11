const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oauthSchema = new Schema({
    userId: {
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

const oauthModel = mongoose.model('oauth', oauthSchema);

module.exports = {
    oauthModel
};
