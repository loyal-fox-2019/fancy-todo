const Todo = require('../models/Todo')
const Project = require('../models/Project')

class TodoController {

   static async create(req, res, next) {
      try {
         const {name, description, due_date} = req.body

         const inputs = {}

         if(name) inputs.name = name
         if(description) inputs.description = description
         if(due_date) inputs.due_date = due_date
         inputs.user = req.decoded.userId
         
         const todo = await Todo.create(inputs)

         res.status(201).json({todo})
      }
      catch (error) {
         next(error)
      }
   }

   static async findOne(req, res, next) {
      try {
         const todo = await Todo.findOne({_id: req.params.id})

         if(!todo) throw {
            errorCode: 404,
            message: 'Todo not found'
         }

         res.status(200).json({todo})
      }
      catch (error) {
         next(error)
      }
   }

   static async find(req, res, next) {
      try {
         let limit = req.query.limit || 100
         let page = req.query.page || 1
         
         const todos = await Todo.find({user: req.decoded.userId})
            .skip(limit * (page - 1))
            .limit(limit)

         res.status(200).json({todos})
      }
      catch (error) {
         next(error)
      }
   }

   static async readFreeTodos(req, res, next) {
      try {
         const todos = await Todo.find({project: null})

         res.status(200).json({todos})
      }
      catch (error) {
         next(error)
      }
   }

   static async updateOne(req, res, next) {
      try {
         const updateData = {}

         if(req.body) {
            if(req.body.name) updateData.name = req.body.name
            if(req.body.description) updateData.description = req.body.description
            if(req.body.status) updateData.status = req.body.status
            if(req.body.due_date) updateData.due_date = req.body.due_date
         }

         const results = await Todo.updateOne(
            {
               _id: req.params.id
            },
            {
               $set: updateData
            }
         )

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }

   static async deleteOne(req, res, next) {
      try {
         const results = await Todo.findOneAndRemove({_id: req.params.id})

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }
}

module.exports = TodoController