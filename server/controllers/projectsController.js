'use strict'

const Project = require('../models/project.js')
const User = require('../models/user.js')
const userErr = {status: 404, message: 'User not found'},
      taskErr = {status: 404, message: 'Task not found'},
      projectErr = {status: 404, message: 'Task not found'};

class projectsController {
  static create (req, res, next) {
    Project.create({
      name: req.body.name,
      user: req.decoded.id
    })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  }

  static findAll (req, res, next) {
    Project.find({ members: req.decoded.id })
      .populate('members', '-password')
      .populate('tasks.task')
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(next)
  }

  static destroy (req, res, next) {
    Project.findOneAndDelete({ _id: req.params.id })
      .then(data => {
        if (data) {
          res.status(200).json({message: `Project with ID ${req.params.id} successfully deleted`})
        } else {
          next(projectErr)
        }
      })
      .catch(next)
  }

  static addMember (req, res, next) {
    User.findOne({ email: req.body.email})
      .then(user => {
        if(!user) {
          next(userErr)
        }
        return Project.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { members: user._id }},
          {
            new: true,
            runValidators: true,
            omitUndefined: true
          }
        )
      })
      .then(project => {
        if (!project) {
          next(projectErr)
        } else {
          res.status(200).json(project);
        }
      })
      .catch(next);
  }

  static deleteMember (req, res, next) {
    Project.findById(req.params.id)
      .populate('user', '-password')
      .populate('members', '-password')
      .then(project => {
        if (!project) {
          next(projectErr)
        } else if (String(project.user.email) === req.params.email) {
          let err = {
            status: 400,
            message: "Can not delete project's owner"
          }
          next(err)
        } else {
          let userId;
          project.members.forEach(member => {
            if (member.email === req.params.email) {
              userId = member._id             
            }
          })
          if (!userId) {
            next(userErr)
          }
          return Project.findByIdAndUpdate(
            req.params.id,
            { $pull: { members: userId }},
            {
              new: true,
              runValidators: true,
              omitUndefined: true
            }
          )
        }
      })
      .then(project => {
        if (!project) {
          next(projectErr)
        } else {
          res.status(200).json(project);
        }
      })
      .catch(next);
  }

  static findOne (req, res, next) {
    Project.findById(req.params.id)
      .populate('members', '-password') 
      .populate('tasks.task')
      .then(project => {
        if (!project) {
          next(projectErr)
        } else {
          res.status(200).json(project);
        }
      })
      .catch(next);
  }

  static addTask (req, res, next) {
    const { title, description, dueDate, timeAllocation } = req.body
    const task = {
      title,
      description,
      dueDate,
      timeAllocation,
      user: req.decoded.id
    }
    Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { tasks: task }},
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    )
      .then(project => {
        if (!project) {
          next(projectErr)
        } else {
          res.status(201).json(project.tasks[project.tasks.length-1]);
        }
      })
      .catch(next)
  }

  static findTask (req, res, next) {
    Project.findById(req.params.id)
      .then(project => {
        if (!project) {
          next(projectErr)
        }
        const task = project.tasks.id(req.params.taskId)
        if (!task) {
          next(taskErr)
        } else {
          res.status(200).json(task);
        }
      })
      .catch(next)
  }

  static updateTask (req, res, next) {
    let { title, description, dueDate, timeAllocation } = req.body
    Project.findById(req.params.id)
    .then(project => {
      if (!project) {
        next(projectErr)
      } else {
        const task = project.tasks.id(req.params.taskId)
        if (!task) {
          next(taskErr)
        }
        if (!title) title = task.title
        if (!description) description = task.description
        if (!dueDate) dueDate = task.dueDate
        if (!timeAllocation) timeAllocation = task.timeAllocation
        task.set({
          title,
          description,
          dueDate,
          timeAllocation
        })
        return project.save();
      }
    })
    .then(project => {
      const updated = project.tasks.id(req.params.taskId)
      res.status(200).json(updated)
    })
    .catch(next)
  }

  static updateTaskProgress (req, res, next) {
    Project.findById(req.params.id)
      .then(project => {
        if (!project) {
          next(projectErr)
        } else {
          const task = project.tasks.id(req.params.taskId)
          if (!task) {
            next(taskErr)
          }
          let newStatus = !task.isDone
          task.set({isDone: newStatus})
          return project.save();
        }
      })
      .then(project => {
        const updated = project.tasks.id(req.params.taskId)
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static deleteTask (req, res, next) {
    Project.findById(req.params.id)
      .then(project => {
        if (!project) {
          next(projectErr)
        }
        return project.tasks.id(req.params.taskId)
      })
      .then(task => {
        if (!task) {
          next(taskErr)
        }
        return Project.findByIdAndUpdate(
          req.params.id,
          { $pull: { tasks: task }},
          {
            new: true,
            runValidators: true,
            omitUndefined: true
          }
        )
      })
      .then(() => {
        res.status(200).json(`Task with ID ${req.params.taskId} successfully deleted`);
      })
      .catch(next)
  }
}

module.exports = projectsController