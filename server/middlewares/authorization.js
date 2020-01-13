const { Todo } = require('../models');
const { ErrorHandler } = require('../helpers');

module.exports = (req, res, next) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (req.userLogin.id === todo.UserId) {
        next();
      } else {
        throw new ErrorHandler(400, 'Todo not found!');
      }
    })
    .catch(err => res.status(500).json(err));
};
