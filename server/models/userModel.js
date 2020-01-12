const mongoose = require('mongoose');
const {hasher} = require('../helpers/bcrypt');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
    }
});

userSchema.pre("save", function(){
    console.log("hashing password...")
    console.log(this)
    let hashed = hasher(this.password)
    this.password = hashed
})

// Compile model from schema
const UserModel = mongoose.model('UserModel', userSchema);


module.exports = 
    UserModel
;
