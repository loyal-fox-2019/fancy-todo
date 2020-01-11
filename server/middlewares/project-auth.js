const Project = require('../models/project')

module.exports = {
  projectOwnerAuth: function(req, res, next) {
    Project.findOne({ _id: req.params.projectId })
      .then(project => {
        if (!project) throw { name: 'NotFound', message: 'Project not found' }
        if (project.owner != req.payload.id) {
          throw {
            name: 'NotAuthorized',
            message: 'You are not the owner of this project',
          }
        }
        next()
      })
      .catch(next)
  },
  projectAuth: function(req, res, next) {
    Project.findOne({ _id: req.params.projectId })
      .then(project => {
        if (!project) throw { name: 'NotFound', message: 'Project not found' }
        if (project.owner == req.payload.id) next()
        else if (project.members.includes(req.payload.id)) next()
        else {
          throw {
            name: 'NotAuthorized',
            message: 'You are not authorized on this project',
          }
        }
      })
      .catch(next)
  },
}
