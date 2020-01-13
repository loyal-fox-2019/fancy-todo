const bcryptjs = require('bcryptjs')
const { Schema, models, model } = require('mongoose')
const todoSchema = require('./todo')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email format',
    ],
    validate: [
      {
        validator: function(email) {
          return models.User.findOne({ email }).then(user => {
            if (user) return false
            return true
          })
        },
        msg: 'Email already registered',
      },
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is requried'],
    minlength: [6, 'Password min length is 6 characters'],
  },
  todos: [todoSchema],
})

userSchema.post('validate', function(user) {
  user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10))
})

const User = model('User', userSchema)

module.exports = User
