const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'name required']
    },
    email: {
        type: String,
        required: [true,'email required'],
        validate:{
            validator: function(v) {
                return User.findOne({email:v})
                .then(user=>{
                    console.log(user)
                    if(user) return false
                })
            },
            message: props => `${props.value} already exists`
        }
    },
    password: {
        type: String,
        required: [true,'password required']
    },
    todos: [{type : Schema.Types.ObjectId, ref: 'Todo'}],
    invitation: [{type : Schema.Types.ObjectId, ref: 'Group'}]
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User