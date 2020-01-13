const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, 
{
  timestamps: true
})

const Project = model('Project', ProjectSchema)
module.exports = Project