const mongoose = require('mongoose')
const { Schema } = mongoose
const hashPassword = require('../helpers/bcryptHash')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill in all fields']
    },
    email:{
        type: String,
        required: [true, 'Please fill in all fields'],
        validate: 
        [
            {
            validator: function (email) {
                let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email)
            },
            message: `Please make sure your email is using the correct email format`
        },
    {
        validator: function () {
            return new Promise((res, rej)=>{
                user.findOne({email:this.email})
                .then(data=>{
                    if(data){
                        // console.log(data)
                        res(false)
                    }else{
                        res(true)
                    }
                })
                .catch(err=>{
                    rej(false)
                })
            })
        },
        message: `Please make sure your email has never been registered yet`
    }]
    },
    password:{
        type: String,
        required: [true, 'Please fill in all fields'],
        minlength: [6, 'Password must be between at least 6 characters ']
    }
})

userSchema.pre('save', function(){
    return hashPassword(this.password)
    .then(hashedPassword=>{
        this.password = hashedPassword
    })
    .catch(err=>{
        throw new Error('Register Failed')
    })
})

const user = mongoose.model('users', userSchema)

module.exports = user