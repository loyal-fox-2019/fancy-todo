const Todo = require('../models/Todo')
const Project = require('../models/Project')

module.exports = {
  async authorizeTodo(req, res, next) {
    try {
      const id = req.params.id
      let todo = await Todo.findById(id)
      if (todo) {
        if (todo.owner == req.decodedId) next()
        else next({status: 401, message: 'You are not authorized!'})
      } else {
        next({status: 404, message: 'Todo is not found!'})
      }
    } catch (error) {
      next(error)
    }
  },
  async authorizeProject(req, res, next) {
    try {
      const id = req.params.id
      let project = await Project.findById(id)
      if (project) {
        if (project.owner == req.decodedId) {
          req.role = 'owner'
          next()
        } else if (project.members.includes(req.decodedId)) {
          req.role = 'member'
          next()
        } else next({status: 401, message: 'You are not authorized!'})
      } else {
        next({status: 404, message: 'project is not found!'})
      }
    } catch (error) {
      next(error)
    }
  }
}