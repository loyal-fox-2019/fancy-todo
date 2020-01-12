const Project = require('../model/Project')

class ProjectController
{
    static test(req,res)
      {
          res.send('Project Connected')
      }

    
    static findAll(req,res,next)
      {
        Project.find()
        .populate('createdBy','username')
        .populate('memberList', 'username')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }
    

    static masterDelete(req,res)
      {
          Project.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    
    static createProject(req,res,next)
      {
          const { title, description } = req.body

          Project.create({
              title, description,
              createdBy: req.decodedUser._id,
              memberList: [ req.decodedUser._id ]
          })
          .then(result=>{
              res.status(201).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static findAllProjectByMemberList(req,res,next)
      {
          Project.find({
              memberList: req.decodedUser._id
          })
          .populate('memberList', 'username')
          .populate('createdBy', 'username')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static patchUpdate(req,res,next)
      {
        const keys = Object.keys(req.body)

        let patchObj = {}
        for(let x = 0; x < keys.length; x++)
          {
            patchObj[keys[x]] = req.body[keys[x]]
          }
        delete patchObj.push
        delete patchObj.pull
        
        if( req.body.push )
          {
            patchObj.$addToSet = {
              memberList : req.body.push
            } 
          }
        if( req.body.pull )
          {
            patchObj.$pull = {
              memberList : { $in : req.body.pull }
            }
          }
        console.log("TCL: patchObj projectController", patchObj)


        Project.update(
            { _id: req.params.projectId },
            patchObj,
            { runValidators: true}
        )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })

      }

    
    static deleteProject(req,res,next)
      {
          Project.remove({
              _id: req.params.projectId
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


}

module.exports = ProjectController