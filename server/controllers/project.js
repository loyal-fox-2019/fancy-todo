const Project = require('../models/project'),
  Todo = require('../models/todo')

class ProjectController {
  static all (req, res, next) {
    Project.find()
      .populate('members')
      .populate('author')
      .populate('todos')
      .then(projects => {
        res.send(projects)
      })
      .catch(next)
  }
  static create (req, res, next) {
    const { name, members } = req.body, 
      author = req.user._id
    Project.create({name, author, members})
      .then(project => {
        res.send(project)
      })
      .catch(next)
  }
  static addTodo (req, res, next) {
    const { id }= req.params.id,
      { name, description, due_date } = req.body
    Todo.create({ name, description, due_date, project: req.params.id })
      .then(todo => {
        return Project.updateOne({ id }, { $push: { todos: todo._id } })
      })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
  static addMember (req, res, next) {
    const id = req.params.id,
      members = req.body.members
    Project.findById( id )
      .then(Project => {
        Project.members.addToSet(members)
        return Project.save()
      })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}

module.exports = ProjectController