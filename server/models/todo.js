const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [6, 'name is not long enough']
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending'
  },
  due_date: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
})

todoSchema.pre('save', function(next) {
  let addition = this.due_date || 7
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + Number(addition))
  this.due_date = newDate
  next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
