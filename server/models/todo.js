const { Schema } = require('mongoose')

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Todo title is required'],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: [true, 'Todo due date is required'],
  },
  status: {
    type: String,
    enum: ['done', 'pending', 'overdue'],
    default() {
      return new Date() > new Date(this.dueDate) ? 'overdue' : 'pending'
    },
  },
})

module.exports = todoSchema
