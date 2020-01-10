'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Project name cannot be blank'],
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
