const Project = require('../models/Project')
const Todo = require('../models/Todo')

class ProjectController{
  static showAll(req, res, next){
    Project
      .find({
        members: req.userData.id
      })
      .then((project) => {
        res.status(200).json(project)
      })
      .catch(next)
  }

  static showOne(req, res, next){
    Project
      .findOne({
        _id: req.params.projectId
      })
      .populate('members', 'username')
      .then((project) => {
        res.status(200).json(project)
      })
      .catch(next)
  }

  static createProject(req, res, next){
    const { name } = req.body
    Project
      .create({
        name,
        owner: req.userData.id,
        members: req.userData.id
      })
      .then((project) => {
        res.status(201).json(project)
      })
      .catch(next)
  }

  static inviteMember(req, res, next){
    const {userId} = req.params
    Project
      .findByIdAndUpdate(
        req.params.projectId, 
        {
          $addToSet: {
            members: userId
          }
        },
        {new: true}
      )
      .populate('members', 'username')
      .select('members')
      .then((projectMembers) => {
        res.status(201).json(projectMembers)
      })
      .catch(next)
  }

  static removeMember(req, res, next){
    const {userId} = req.params
    Project
      .findByIdAndUpdate(
        req.params.projectId, 
        {
          $pull: {
            members: userId
          }
        },
        {new: true}
      )
      .then((project) => {
        res.status(200).json(project)
      })
      .catch(next)
  }

  static deleteProject(req, res, next){
    const { projectId } = req.params
    let project = {}
    Project
      .findByIdAndDelete(projectId)
      .then((projectData) => {
        project = projectData
        return Todo
          .deleteMany({project: projectId})
      })
      .then(() => {
        res.status(200).json(project)
      })
      .catch(next)
  }
}

module.exports = ProjectController