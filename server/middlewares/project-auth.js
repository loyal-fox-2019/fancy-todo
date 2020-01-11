const Project = require('../models/project')

module.exports = {
  projectOwnerAuth: function(req, res, next) {
    Project.findOne({ _id: req.params.projectId })
      .then(project => {
        if (!project) throw { name: 'NotFound', message: 'Project not found' }
        if (project.owner != req.payload.id) {
          throw { name: 'NotAuthorized', message: 'You are not authorized' }
        }
        next()
      })
      .catch(next)
  },
}
