const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require('../helper/hashpassword')


const UserSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    password: {type: String},
    todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
})

UserSchema.pre('save', function(next){
    Bcrypt.hash(this.password)
    .then((result)=>{
        this.password = result
        next()
    })
})

const User = mongoose.model('User', UserSchema)

module.exports = User