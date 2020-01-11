const Project = require('../models/project')
const User = require('../models/user')

class ProjectController {
  static createProject(req, res, next) {
    Project.create({
      name: req.body.name,
      owner: req.payload.id,
    })
      .then(project => {
        res.status(201).json({ message: 'Project created' })
      })
      .catch(next)
  }

  static getUserProjects(req, res, next) {
    Project.find({
      $or: [
        {
          owner: req.payload.id,
        },
        {
          members: req.payload.id,
        },
      ],
    })
      .then(projects => {
        res.json({ projects })
      })
      .catch(next)
  }

  static editProject(req, res, next) {
    if (!req.body.name) {
      return next({ name: 'BadRequest', message: 'Project name is required' })
    }

    Project.findOneAndUpdate(
      { _id: req.params.projectId },
      { name: req.body.name },
    )
      .then(project => {
        res.json({ message: 'Project name changed' })
      })
      .catch(next)
  }

  static deleteProject(req, res, next) {
    Project.findByIdAndRemove(req.params.projectId)
      .then(project => {
        res.json({ message: 'Project deleted' })
      })
      .catch(next)
  }

  static addTodoProject(req, res, next) {
    let projectFound = null

    Project.findOne({ _id: req.params.projectId })
      .then(project => {
        projectFound = project

        projectFound.todos.push({
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
        })

        return projectFound.todos[projectFound.todos.length - 1].validate()
      })
      .then(() => projectFound.save())
      .then(project => {
        res.status(201).json({ message: 'Todo project created' })
      })
      .catch(next)
  }

  static editTodoProject(req, res, next) {
    let projectFound = null

    Project.findOne({ _id: req.params.projectId })
      .then(project => {
        projectFound = project
        const todo = projectFound.todos.id(req.params.todoId)

        if (!todo) throw { name: 'NotFound', message: 'Todo project not found' }

        todo.title = req.body.title || todo.title
        todo.description = req.body.description || todo.description
        todo.dueDate = req.body.dueDate || todo.dueDate
        todo.status = req.body.status || todo.status

        return todo.validate()
      })
      .then(() => projectFound.save())
      .then(project => {
        res.json({ message: 'Todo project edited' })
      })
      .catch(next)
  }

  static deleteTodoProject(req, res, next) {
    Project.findOne({ _id: req.params.projectId })
      .then(project => {
        const todo = project.todos.id(req.params.todoId)

        if (!todo) throw { name: 'NotFound', message: 'Todo project not found' }

        todo.remove()

        return project.save()
      })
      .then(project => {
        res.json({ message: 'Todo project deleted' })
      })
      .catch(next)
  }

  static addMember(req, res, next) {
    if (!req.body.email) {
      return next({ name: 'BadRequest', message: 'User email is required' })
    }

    let userFound = null

    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) throw { name: 'NotFound', message: 'User email not found' }

        userFound = user
        return Project.findOne({ _id: req.params.projectId })
      })
      .then(project => {
        if (project.owner == userFound.id) {
          throw {
            name: 'Forbidden',
            message: 'You are the owner of this project',
          }
        }

        project.members.push(userFound.id)
        return project.save()
      })
      .then(project => {
        res.status(200).json({ message: 'Members added' })
      })
      .catch(next)
  }

  static kickMember(req, res, next) {
    Project.findOneAndUpdate(
      { _id: req.params.projectId },
      { $pull: { members: req.params.memberId } },
    )
      .then(project => {
        res.json({ message: 'Member kicked' })
      })
      .catch(next)
  }
}

module.exports = ProjectController
