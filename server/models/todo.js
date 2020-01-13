const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  due_date: {
    type: Date,
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Todo', todoSchema);
