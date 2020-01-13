const { Schema, model } = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const UserSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!'],
    validate: {
      validator(email) {
        console.log(email);
        return User.findOne({
          email
        })
        .then( user => {
          return user ? false : true
        })
      },
      message: 'Email already registered'
    }
  },
  password: {
    type: String,
    minlength: [6, 'Password need to be at least 6 character!'],
    maxlength: [20, 'Password cannot exceed 20 characters!'],
    required: [true, 'Password cannot be empty'],
  }
}, 
{
  timestamps: true
})

UserSchema.pre('save', function(next) {
  this.password = hash(this.password)
  this.email = this.email.toLowerCase()
  next()
})

const User = model('User', UserSchema)
module.exports = User