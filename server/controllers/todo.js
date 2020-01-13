const { Todo } = require('../models');
const { ErrorHandler } = require('../helpers');

class TodoController {
  static create(req, res, next) {
    // console.log(req.userLogin);
    const { id } = req.userLogin;
    const { name, description } = req.body;
    Todo.create({ name, description, userId: id })
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    const { id } = req.params;
    Todo.findById(id)
      .then(data => {
        if (!data) {
          throw new ErrorHandler(404, `Todo not found!`);
        } else {
          res.status(200).json(data);
        }
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    const { id } = req.userLogin;
    Todo.find({ userId: id })
      .then(data => {
        if (data.length === 0) {
          throw new ErrorHandler(404, `Empty!`);
        } else {
          res.status(200).json(data);
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { id } = req.params;
    Todo.findOneAndUpdate({ _id: id }, req.body)
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    Todo.findOneAndDelete({ _id: id })
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  }
}

module.exports = TodoController;
