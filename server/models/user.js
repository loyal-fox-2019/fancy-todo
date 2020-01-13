const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Username field required']
    },
    email: {
        type: String,
        required: [true, 'Email field required']
    },
    password: {
        type: String,
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;