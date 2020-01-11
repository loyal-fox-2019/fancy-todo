const mongoose = require('mongoose'),
  { Schema } = mongoose

const projectSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  name: {
    type: String,
    required: [true, 'project name required']
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project