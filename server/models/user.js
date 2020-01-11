const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
    validate: {
      validator: function(value) {
        return User.findOne({ email: value })
          .then(user => {
            if (user) return false;
          });
      },
      message: props => 'Email already registered'
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password not long enough']
  }
})

userSchema.pre('save', function(next) {
  this.password = hash(this.password)
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
