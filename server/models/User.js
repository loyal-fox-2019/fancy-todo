const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator: function(value) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value);
      },
      message: () => `Email is not valid`
    }, {
      validator: function(value) {
        return User
          .findOne({email: value})
          .then((email) => {
            if (email) {
              return false
            }
            else {
              return true
            }
          })
          .catch((err) => {
            console.log(err)
            return false
          })
      },
      message: () => `Email is used`
    }]
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    validate: {
      validator: function(value) {
        return User
          .findOne({username: value})
          .then((username) => {
            if (username) {
              return false
            }
            else {
              return true
            }
          })
          .catch((err) => {
            console.log(err)
            return false
          })
      },
      message: () => `Username is used`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password is too short']
  }
}, {
  timestamps: true
})

userSchema.pre('save', function(next){
  this.password = bcrypt.hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User