'use strict';
const { Todo, Project } = require('../models');

module.exports = (req, res, next) => {
  let isAllowed = false;
  const { _id } = req.decoded;
  const { todoId } = req.params
  Todo
    .findById(todoId)
    .then((todo) => {
      if (!todo.projectId) {
        if (todo.userId == _id) {
          next();
        } else {
          next({ auth: true, status: 401, message: 'Action denied' });
        }
      } else {
        console.log('tetap masuk?')
        const { projectId } = todo;
        Project
        .findOne({ _id: projectId })
        .then((project) => {
          console.log('masuk kesini')
          project.members.forEach(member => {
            if (member == _id) {
              isAllowed = true
            }
            if (!isAllowed) {
              next({ auth: true, status: 401, message: 'Action denied' });
            } else {
              next();
            }
          });
        })
      }
    })
    .catch(next);
}