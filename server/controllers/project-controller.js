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
    res.json({ message: 'welcome to edit project route' })
  }

  static deleteProject(req, res, next) {
    res.json({ message: 'welcome to delete project route' })
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
