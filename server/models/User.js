'use strict';

const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be blank']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be blank'],
    unique: [true],
    validate: {
      validator: function(value) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          value
        );
      },
      msg: "Please enter correct email address"
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
    minlength: [6, 'You password should be at least 6 characters'],
    maxlength: [12, 'The maximum of your password length is 12 charactes']
  },
})

UserSchema.pre('save', function(next) {
  let user = this;
  const hashedPassword = hashPassword(user.password);
  user.password = hashedPassword;
  next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
