const { verify } = require('../helpers/jwt')
const Project = require('../models/projects')
const User = require('../models/users')
const Todo = require('../models/todos')

function authentication(req, res, next) {
    try {
        req.decoded = verify(req.headers.token)
        // console.log(req.decoded);
        next()
    } catch (error) {
        next(error)
    }
}

function authorization(req, res, next) {
    Todo.findById(req.params.id)
    .then((todo) => {
        if(!todo) next({ status: 404, msg: 'Todo not found' })
        else if (!todo.creator) next()
        else if (todo.creator != req.decoded.id ) next({ status: 403, msg: "Unauthorized" })
        else next()
    }).catch(next);
}

module.exports = {
    authentication,
    authorization
}