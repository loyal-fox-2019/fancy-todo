'use strict'

const mongoose = require('mongoose');
const TaskSchema = require('./task')

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project\'s name is required']
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    tasks: {
      type: [ TaskSchema ]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProjectSchema.pre('save', function (next) {
  if (!this.members.includes(this.user)) {
    this.members.push(this.user)
  }
  next()
})

module.exports = mongoose.model('Project', ProjectSchema);