const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')
const {hashPassword} = require('../helpers/bcrypt')

const Project = require('./Project')
const Todo = require('./Todo')

const userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Must insert username'],
      unique: [true, 'This username has been registered']
   },

   email: {
      type: String,
      required: [true, 'Must insert email'],
      unique: [true, 'This email has been registered'],
      validate: {
         validator: v => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
         }
      }
   },

   password: {
      type: String,
      required: [true, 'Must insert password']
   },

   todos: [{
      type: Schema.Types.ObjectId,
      ref: 'Todo'
   }]
})

userSchema.plugin(timestamp)

userSchema.pre('save', function(next) {
   this.password = hashPassword(this.password)
   next()
})

userSchema.pre('findOneAndRemove', async function(next) {
   // remove the user from all projects
   console.log(this, this._id, '\n----------\nthis is user pre remove data')

   const projectUpdateResults = await Project.updateMany(
      {users: this._id},

      {
         $pull: {
            users: this._id
         }
      }
   )
   console.log('this is projectUpdateResults\n', projectUpdateResults)

   // check project with empty users
   
   const projectDeleteResults = await Project.deleteMany({users: []})
   console.log('this is projectDeleteResults\n', projectDeleteResults)
   
   // remove all todos made by the user

   const todoDeleteResults = await Todo.deleteMany({user: this._id})
   console.log('this is todoDeleteResults', todoDeleteResults)

   next()
})

const User = mongoose.model('User', userSchema)

module.exports = User