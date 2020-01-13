const Project = require('../models/Project')
const Todo = require('../models/Todo')
const nodemailer = require('nodemailer')

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
      const memberEmail = req.body.email
      const nodemailer = require("nodemailer");

      
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
          }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: memberEmail, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>" // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

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