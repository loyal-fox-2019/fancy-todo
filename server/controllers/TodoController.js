const Todo = require('../models/Todo')

class TodoController {
  static async create(req, res, next) {
    try {
      let { title, description, dueDate } = req.body
      let owner = req.decodedId
      let todo = await Todo.create({ title, description, owner, dueDate })
      res.status(201).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async getAll(req, res, next) {
    try {
      let owner = req.decodedId
      let todos = await Todo.find({ owner })
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }
  static async getOne(req, res, next) {
    try {
      let todo = await Todo.findById(req.params.id)
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async updateDetail(req, res, next) {
    try {
      const { title, description, dueDate } = req.body
      let todo = await Todo
        .findByIdAndUpdate(
          req.params.id, 
          { title, description, dueDate },
          { new: true, runValidators: true }
        )
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async updateStatus(req, res, next) {
    try {
      const { status } = req.body
      let todo = await Todo
        .findByIdAndUpdate(
          req.params.id, 
          { status },
          { new: true, runValidators: true }
        )
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      let todo = await Todo.findByIdAndDelete(req.params.id)
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController