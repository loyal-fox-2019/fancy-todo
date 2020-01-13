const Project = require('../models/Project')
const Todo = require('../models/Todo')
const { Schema } = require('mongoose')

class ProjectController {
  static async create(req, res, next) {
    try {
      let { name, description } = req.body
      let owner = req.decodedId
      let project = await Project.create({ name, description, owner })
      res.status(201).json(project)
    } catch (error) {
      next(error)
    }
  }
  static async getAll(req, res, next) {
    try {
      let id = req.decodedId
      let projects = await Project
        .find({ 
          $or: [
            { owner: id },  
            { members: id }
          ]
        })
        .populate('members')
      res.status(200).json(projects)
    } catch (error) {
      next(error)
    }
  }
  static async getOne(req, res, next) {
    try {
      let project = await Project
        .findById(req.params.id)
        .populate('owner')
        .populate('todos')
        .populate('members')
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  }
  static async updateDetail(req, res, next) {
    try {
      if (req.role === "owner") {
        const { name, description } = req.body
        let project = await Project
          .findByIdAndUpdate(
            req.params.id, 
            { name, description },
            { new: true }
          )
        res.status(200).json(project)
      } else next({status: 401, message: "Only owner can change project detail!"})
    } catch (error) {
      next(error)
    }
  }
  static async addMember(req, res, next) {
    try {
      let project = await Project
        .findByIdAndUpdate(
          req.params.id, 
          { $addToSet : { members: req.body.userId } },
          { new: true }
        )
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  }
  static async removeMember(req, res, next) {
    try {
      const { id, memberId } = req.params
      let project = await Project
        .findByIdAndUpdate(
          id,
          {$pull : { members : memberId}},
          { new: true }
        )
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      if (req.role === "owner") {
        let project = await Project.findByIdAndDelete(req.params.id)
        res.status(200).json(project)
      } else {
        next({status: 401, message: 'Only owner can delete the project'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async getTodo(req, res, next) {
    try {
      let project = await Project
        .findById(req.params.id)
        .populate({ 
            path: 'todos', 
            options: { sort: { updatedAt: -1 }}
        })

      res.status(201).json(project)
    } catch (error) {
      next(error)
    }
  }
  static async getOneTodo(req, res, next) {
    try {
      let todo = await Todo.findById(req.params.todoId)
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async createTodo(req, res, next) {
    try {
      let { title, description, dueDate } = req.body
      let owner = req.decodedId
      let todo = await Todo.create({ title, description, dueDate, owner })
      let project = await Project
        .findByIdAndUpdate(
          req.params.id,
          {$push: { todos: todo._id }},
          {new: true} 
        )
      res.status(201).json(project)
    } catch (error) {
      next(error)
    }
  }
  static async updateDetailTodo(req, res, next) {
    try {
      const { title, description, dueDate } = req.body
      let todo = await Todo
        .findByIdAndUpdate(
          req.params.todoId, 
          { title, description, dueDate },
          { new: true, runValidators: true }
        )
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async updateStatusTodo(req, res, next) {
    try {
      const { status } = req.body
      let todo = await Todo
        .findByIdAndUpdate(
          req.params.todoId, 
          { status },
          { new: true }
        )
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async deleteTodo(req, res, next) {
    try {
      let todo = await Todo.findByIdAndDelete(req.params.todoId)
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProjectController