const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const projectSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Project name has to be specified']
   },

   users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],

   todos: [{
      type: Schema.Types.ObjectId,
      ref: 'Todo'
   }]
})

projectSchema.plugin(timestamp)

const Project = mongoose.model('Project', projectSchema)

module.exports = Project