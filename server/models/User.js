const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;