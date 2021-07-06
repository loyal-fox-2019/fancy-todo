'use strict';
const { Todo } = require('../models');

module.exports = (req, res, next) => {
  const { todoId } = req.params;
  Todo
    .findById(todoId)
    .then((todo) => {
      if (todo.projectId) {
        next({ auth: true, status: 401, message: 'Unauthorized' });
      } else {
        next();
      }
    })
    .catch(next);
};
