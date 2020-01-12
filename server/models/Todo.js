const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Todo name is required']
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  },
  due_date: {
    type: Date,
    default: +new Date() + (24 * 60 * 60 * 1000)
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId, 
    ref: 'Project'
  }
}, {
  timestamps: true
})

//bikin validasi todo cuma bisa dibuat sama user yang member di project itu

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo