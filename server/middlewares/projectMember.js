'use strict';
const { Project } = require('../models');

module.exports = (req, res, next) => {
  let isMember = false;
  const { _id } = req.decoded;
  Project
    .findOne({ _id: req.params.projectId })
    .then((project) => {
      if (!project) {
        next({ auth: true, status: 404, message: 'Cannot find project' });
      } else {
        project.members.forEach(member => {
          if(member == _id) isMember = true
        });
        if (!isMember) {
          next({ auth: true, status: 401, message: 'Unauthorized' }) 
        } else next();
      }
    })
    .catch(next);
}
