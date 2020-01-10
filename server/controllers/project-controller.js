const Project = require('../models/project')

class ProjectController {
  static createProject(req, res, next) {
    res.json({ message: 'Welcome to create project route' })
  }

  static getProject(req, res, next) {
    res.json({ message: 'Welcome to get project route' })
  }

  static editProject(req, res, next) {
    res.json({ message: 'welcome to edit project route' })
  }

  static deleteProject(req, res, next) {
    res.json({ message: 'welcome to delete project route' })
  }
}

module.exports = ProjectController
