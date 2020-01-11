const Project = require('../models/project'),
  Todo = require('../models/todo')

class ProjectController {
  static all (req, res, next) {
    Project.find()
      .populate('members')
      .populate('author')
      .then(projects => {
        res.send(projects)
      })
      .catch(next)
  }
  static getTodo (req, res, next) {
    Todo.find({project: req.params.id})
      .then(todos=> {
        res.send(todos)
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
    const { name, description, due_date } = req.body,
      id = req.params.id
    Project.findById( id )
      .then(project => {
        if(!project) {
          next({status: 404, message: 'id not found'})
        } else {
          Todo.create({ name, description, due_date, project: id })
            .then(todo => {
              res.send(todo)
            })  
        }
      })
      .catch(next)
  }
  static addMember (req, res, next) {
    const id = req.params.id,
      members = req.body.members
    Project.findById( id )
      .then(project => {
        if(!project) {
          next({status: 404, message: 'id not found'})
        } else {
          project.members.addToSet(members)
          project.save()
            .then(result => {
              res.send(result)
            })
        }
      })
      .catch(next)
  }
  static destroy (req, res, next) {
    const id = req.params.id
    Project.deleteOne({ id })
      .then(result => {
        console.log(result)
        res.send(result)
      })
      .catch(next)
  }
}

module.exports = ProjectController