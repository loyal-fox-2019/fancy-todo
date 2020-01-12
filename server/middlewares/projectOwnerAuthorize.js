const Project = require('../models/Project')

function authorize(req, res, next){
  Project
    .findOne({
      _id: req.params.projectId
    })
    .then((project) => {
      if (project.owner == req.userData.id){
        next()
      }
      else {
        next({
          errorCode: 401,
          message: `You are not authorized`
        })
      }
    })
    .catch(next)
}

module.exports = authorize