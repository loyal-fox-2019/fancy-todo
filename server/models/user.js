const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hash} = require('../helpers/encryption')

const userSchema = new Schema({
    username:{
        type: String,
        required:true,
        validate:{
            validator: function(val){
                return User.findOne({
                    username:val
                })
                .then(user=>{
                    if(user){
                        return false
                    }else{
                        return true
                    }
                })
            }
        }
    },
    email:{
        type: String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please enter a valid email'],
        validate:{
            validator: function(val){
                return User.findOne({
                    email:val
                })
                .then(user=>{
                    if(user){
                        return false
                    }else{
                        return true
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    },
    password:{
        type: String,
        required:true
    }
})

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User