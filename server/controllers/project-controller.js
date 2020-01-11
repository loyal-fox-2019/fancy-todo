const Project = require('../models/project')

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
    res.json({ message: 'welcome to add todo project' })
  }

  static getTodoProject(req, res, next) {
    res.json({ message: 'welcome to get todo project' })
  }

  static editTodoProject(req, res, next) {
    res.json({ message: 'welcome to edit todo project' })
  }

  static deleteTodoProject(req, res, next) {
    res.json({ message: 'welcome to delete todo project' })
  }

  static addMember(req, res, next) {
    res.json({ message: 'welcome to add member route' })
  }

  static kickMember(req, res, next) {
    res.json({ message: 'welcome to kick member route' })
  }
}

module.exports = ProjectController
