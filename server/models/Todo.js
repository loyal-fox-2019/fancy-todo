'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name cannot be blank'],
  },
  description: {
    type: String,
    required: [true, 'description cannot be blank'],
  },
  status: {
    type: Number,
  },
  due_date: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  projectId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project',
  },
}, { timestamps: { createdAt: 'createdAt' , updatedAt: 'updatedAt'}})

TodoSchema.pre('save', function(next) {
  let todo = this;
  todo.status = 0
  next();
})

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;