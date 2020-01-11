const { Schema, model, models } = require('mongoose')
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
      // validate: {
      // validator: function(members) {
      // return models.Project.findOne({ members }).then(project => {
      // if (project) return false
      // return true
      // })
      // },
      // msg: 'Member already on this project',
      // },
    },
  ],
  todos: [todoSchema],
})

projectSchema.pre('save', function(next) {
  const memberLength = this.members.length
  const uniqueMemberLength = this.members.filter((member, index) => {
    return this.members.indexOf(member) === index
  }).length

  if (memberLength === uniqueMemberLength) next()
  else {
    const err = new Error()
    err.name = 'MemberAlreadyRegistered'
    next(err)
  }
})

const Project = model('Project', projectSchema)

module.exports = Project
