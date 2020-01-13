'use strict'

const mongoose = require('mongoose');
const { hashPass } = require('../helpers/bcrypt.js')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    validate: [{
      validator: function (value) {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return value.match(emailFormat)
      },
      message: props => `${props.value} is not a valid email format!`
    }, {
      validator: function (value) {
        return User.findOne({
          id: {$ne: this._id},
          email: value
        })
          .then(data => {
            return !data
          })
          .catch(err => {
            console.log(err)
          })
      },
      message: props => `This email ${props.value} has already been used!`
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Please insert minimum 8 character for the password']
  },
  avatar: {
    type: String
  },
  // tasks: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Task'
  // }],
},
{
  timestamps: true,
  versionKey: false
});

UserSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = hashPass(this.password)
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User