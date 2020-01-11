const { verify } = require('../helpers/jwt')
const Project = require('../models/projects')
const User = require('../models/users')
const Todo = require('../models/todos')

function authentication(req, res, next) {
    try {
        req.decoded = verify(req.headers.access_token)
        console.log(req.decoded);
        next()
    } catch (error) {
        next(error)
    }
}

// function memberAuth(req, res, next) {
//     Todo.findById(req.params.todoId)
//     .then((result) => {
        
//     }).catch((err) => {
        
//     });
// }

module.exports = {
    authentication,
    // memberAuth
}