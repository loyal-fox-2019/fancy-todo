const Todo = require('../model/Todo')

class TodoController 
{
    static test (req,res)
      {
          console.log('masuks ini')
          res.send('todo connected')
      }
      

    static findAll(req,res,next)
      {
        Todo.find()
        .populate('createdBy', 'username')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }


    static masterDelete (req,res,next)
      {   
          Todo.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    
      
    static create (req,res,next)
      {
        const { title, description, dueDate } = req.body
        const status = 'unFinish'
        const projectId = req.params.projectId

        Todo.create({
          title, description, status, dueDate, projectId,
          createdBy : req.decodedUser._id,
          createdAt : new Date(),
          updatedBy : null,
          updatedAt : null
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })

      }
    


    static findAllTodoByUserId(req,res,next)
      {
        Todo.find({
          createdBy : req.decodedUser._id
        })
        .populate('createdBy', 'username')
        .populate('updatedBy', 'username')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }


    static findTodoByProjectId(req,res,next)
      {
          Todo.find({
              projectId : req.params.projectId
          })
          .populate('projectId', 'title')
          .populate('createdBy', 'username')
          .populate('updatedBy', 'username')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static putUpdate (req,res,next)
      {
        const { title, description, status, dueDate } = req.body

        Todo.updateOne(
          { _id : req.params.todoId },
          {
            title, description, status, dueDate,
            updatedBy : req.decodedUser._id,
            updatedAt : new Date(),
          },
          { runValidators : true }
        )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }


    static patchUpdate (req,res,next)
      {
        const keys = Object.keys(req.body)

        let patchObj = {}
        for (let x = 0; x < keys.length; x++)
          {
            patchObj[keys[x]] = req.body[keys[x]]
          }
        patchObj.updatedBy = req.decodedUser._id
        patchObj.updatedAt = new Date()


        Todo.updateOne(
          { _id: req.params.todoId },
          patchObj,
          { runValidators : true }
        )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })

      }
    

    static delete (req,res,next)
      {
        Todo.remove({
            _id:req.params.todoId
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }

}
 

module.exports = TodoController