'use strict';
const { Todo, Project } = require('../models');


class TodoController {
  static async createTodo(req, res, next) {
    const projectId = req.params.projectId || null;
    const { name, description, due_date, } = req.body;
    const date = new Date(due_date);
    const data = {
      name,
      description,
      due_date: date,
      userId: req.decoded._id,
      projectId,
    };
    if (projectId) {
      let isMember = false;
      Project
        .findById(projectId)
        .then((project) => {
          if(!project) {
            next({ auth: true, status: 404, message: 'Invalid project id' });
          } else {
            project.members.forEach(member => {
              if (req.decoded._id == member) isMember = true;
            });
            if (!isMember) {
              next({ auth: true, status: 401, message: 'You are not member of this project' })
            } else {
              Todo
                .create(data)
                .then((newTodo) => res.status(201).json(newTodo))
                .catch(next);
            }
          }
        })
    } else {
      try {
        const newTodo = await Todo.create(data);
        res.status(201).json(newTodo);
      } catch (err) {
        next(err);
      };
    }
  }

  static async getTodos(req, res, next) {
    const { _id } = req.decoded;
    try {
      const todos = await Todo.find({ userId: _id, projectId: null });
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    };
  }

  static async markAsDone(req, res, next) {
    const { todoId } = req.params;
    const filter = { _id: todoId };
    const update = { status: 1 };
    try {
      const todo = await Todo.findOneAndUpdate(filter, update);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    };
  }

  static async markAsUndone(req, res, next) {
    const { todoId } = req.params;
    const filter = { _id: todoId };
    const update = { status: 0 };
    try {
      const todo = await Todo.findOneAndUpdate(filter, update);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    };
  }

  static async updateTodo(req, res, next) {
    const { name, description, due_date, } = req.body;
    const { todoId } = req.params;
    const filter = { _id: todoId };
    const newData = {
      name,
      description,
      due_date,
    };
    try {
      const update = await Todo.findByIdAndUpdate(filter, newData)
      res.status(200).json(update);
    } catch (err) {
      next(err);
    }
  }

  static async removeTodo(req, res, next) {
    const { todoId } = req.params;
    try {
      const remove = await Todo.deleteOne({ _id: todoId })
      res.status(200).json(remove);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;