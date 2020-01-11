const { Schema, model } = require('mongoose')
const todoSchema = require('./todo')

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    maxlength: [15, 'Project name max 15 characters'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  todos: [todoSchema],
})

const Project = model('Project', projectSchema)

module.exports = Project
