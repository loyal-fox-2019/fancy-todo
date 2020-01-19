const Todo = require('../models/Todo')

function authorize(req, res, next){
  Todo
    .findOne({
      _id: req.params.id
    })
    .populate({
      path: 'project',
      populate: {
        path: 'members',
        select: '_id'
      }
    })
    .then((todo) => {
      if (todo.owner == req.userData.id || todo.project.members.filter((e) => {e._id == req.userData.id})){
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