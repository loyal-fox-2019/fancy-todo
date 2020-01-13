const Project = require('../models/Project')
const Todo = require('../models/Todo')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

class ProjectController {
   static async create(req, res, next) {
      try {
         const project = await Project.create({
            name: req.body.name,
            users: [req.decoded.userId]
         })
         
         res.status(201).json({project})
      }
      catch (error) {
         next(error)
      }
   }

   static async readOne(req, res, next) {
      try {
         const project = await Project.findOne({_id: req.params.id})
            .populate('todos')
         res.status(200).json({project})
      }
      catch (error) {
         next(error)
      }
   }

   static async read(req, res, next) {
      try {
         let page = req.query.page || 1
         const projects = await Project.find({
            users: req.decoded.userId
         })
            // .limit(5)
            // .skip(5 * (page - 1))

         res.status(200).json({projects})
      }
      catch (error) {
         next(error)
      }
   }

   static async updateOne(req, res, next) {
      try {
         const inputs = {}
         const {name} = req.body

         if(name) inputs.name = name

         const results = await Project.updateOne(
            {_id: req.params.id},
            {$set: inputs}
         )

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }

   static async generateProjectToken(req, res, next) {
      try {
         if(!req.params || !req.params.id) throw {
            errorCode: 400,
            message: 'This action requires project id parameter'
         }

         if(!req.body || !req.body.email) throw {
            errorCode: 400,
            message: 'This action requires email of the user you are going to invite'
         }

         const payload = {
            projectId: req.params.id,
            email: req.body.email
         }

         const project_token = jwt.sign(payload, process.env.JWT_SECRET)

         res.status(200).json({project_token})
      }
      catch (error) {
         next(error)
      }
   }

   // need to go through auth: joinProjectAuthentication
   static async userJoinProject(req, res, next) {
      try {
         const project = await Project.findOne({_id: req.decoded.projectId})
         console.log(req.decoded)
         if(!project) throw {
            errorCode: 400,
            message: 'Invalid project token'
         }

         if(project.users.includes(req.decoded.userId)) res.status(202).json({message: 'User already joined the project group'})
         else {
            const results = await Project.updateOne(
               {_id: req.decoded.projectId},
   
               {
                  $push: {
                     users: req.decoded.userId
                  }
               }
            )
   
            res.status(200).json({results})
         }
      }
      catch (error) {
         next(error)
      }
   }

   // need to go through auth: projectOwnerAuthorization
   // data needed: body.userId
   static async removeUser(req, res, next) {
      try {
         if(!req.body || !req.body.email) throw {
            errorCode: 400,
            message: 'User email is required'
         }

         const user = await User.findOne({email: req.body.email})
         const project = await Project.findOne({_id: req.params.id})

         if(!project) throw {
            errorCode: 400,
            message: 'Invalid project id'
         }

         if(!user) throw {
            errorCode: 400,
            message: 'Invalid email'
         }

         if(!project.users.includes(user._id)) throw {
            errorCode: 400,
            message: 'The specified user is not in the group project'
         }
         
         if(JSON.stringify(project.users[0]) == JSON.stringify(user._id)) {
               throw {
               errorCode: 403,
               message: 'You as the owner of this project, cannot remove yourself from this project'
            }
         }
         
         const results = await Project.updateOne(
            {_id: req.params.id},

            {
               $pull: {
                  users: user._id
               }
            }
         )

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }

   static async addTodoToProject(req, res, next) {
      try {
         try {
            if(!req.body || !req.body.todoId) throw {
               errorCode: 400,
               message: 'Todo id is required'
            }

            if(!req.params || !req.params.id) throw {
               errorCode: 400,
               message: 'Project id is required'
            }

            const project = await Project.findOne({
               _id: req.params.id
            })

            if(!project) throw {
               errorCode: 400,
               message: 'Invalid project id'
            }

            if(project.todos.includes(req.body.todoId)) throw {
               errorCode: 400,
               message: 'Cannot add the same todo into this project'
            }

            const results = await Project.updateOne(
               {_id: req.params.id},

               {
                  $push: {
                     todos: req.body.todoId
                  }
               }
            )

            const updateTodoResults = await Todo.updateOne(
               {_id: req.body.todoId},

               {
                  $set: {
                     project: req.params.id
                  }
               }
            )

            res.status(200).json({results, updateTodoResults})
         }
         catch (error) {
            next(error)
         }
      }
      catch (error) {
         next(error)
      }
   }

   static async removeTodo(req, res, next) {
      try {
         if(!req.params || !req.params.id) throw {
            errorCode: 400,
            message: 'Project id is required'
         }

         if(!req.body || !req.body.todoId) throw {
            errorCode: 400,
            message: 'Todo id is required'
         }

         const project = await Project.findOne({_id: req.params.id})

         if(!project) throw {
            errorCode: 404,
            message: 'Invalid project id'
         }

         if(!project.todos.includes(req.body.todoId)) throw {
            errorCode: 400,
            message: 'The todo is not in this project'
         }

         const results = await Project.updateOne(
            {_id: req.params.id},

            {
               $pull: {
                  todos: req.body.todoId
               }
            }
         )

         const updateTodoResults = await Todo.updateOne(
            {_id: req.body.todoId},

            {
               $set: {
                  project: null
               }
            }
         )

         res.status(200).json({results, updateTodoResults})
      }
      catch (error) {
         next(error)
      }
   }

   static async deleteOne(req, res, next) {
      try {
         if(!req.params || !req.params.id) throw {
            errorCode: 400,
            message: 'Project id is required'
         }

         const results = await Project.deleteOne({_id: req.params.id})
         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }
}

module.exports = ProjectController