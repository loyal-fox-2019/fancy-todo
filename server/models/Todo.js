const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const Project = require('./Project')

const todoSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Must insert todo name']
   },

   description: {
      type: String
   },

   status: {
      type: String,
      default: 'unfinished'
   },

   due_date: {
      type: Date,
      required: [true, 'Must specify due date']
   },

   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A todo must have an owner']
   },

   project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
   }
})

todoSchema.plugin(timestamp)

todoSchema.pre('findOneAndRemove', function(next) {
   // pull from project
   console.log(this._id, '\nat pre remove, this is this._id\n')
   Project.updateMany(
      {todos: this._id},

      {
         $pull: {
            todos: this._id
         }
      }
   ).exec()

   next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo