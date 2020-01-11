const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
})

const user = mongoose.model('users', userSchema)

module.exports = user