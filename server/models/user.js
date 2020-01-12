const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        minlength: [6, 'Username min. 6 characters'],
        unique: true
    },
    password: {
        type: String,
        minlength: [6, 'Password min. 6 characters']
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailFormat.test(email);
            },
            message: 'Invalid email format'
        }
    },
    createdAt: {
        type: Date
    }
});

userSchema.pre('save', function (next) {
    const hash = require('../helpers/hash');
    hash(this.password)
        .then((hash) => {
            this.password = hash
            this.createdAt = new Date().toDateString()
            next()
        })
        .catch((err) => {
            console.log(err);
            next(err)
        })
})

module.exports = mongoose.model('User', userSchema);
