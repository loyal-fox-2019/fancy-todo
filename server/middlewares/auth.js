const { verify } = require('../helpers/jwt')
const Project = require('../models/projects')
const User = require('../models/users')
const Todo = require('../models/todos')

function authentication(req, res, next) {
    try {
        // console.log(req.headers.token);
        req.decoded = verify(req.headers.token)
        // console.log(req.decoded);
        User.findById(req.decoded.id)
            .then((user) => {
                if (!user) next({ status: 403, msg: "Token Rejected" })
                else next()
            }).catch(next);
    } catch (error) {
        next(error)
    }
}

function authorization(req, res, next) {
    Todo.findById(req.params.id)
        .then((todo) => {
            if (!todo) next({ status: 404, msg: 'Todo not found' })
            else if (!todo.creator) {
                Project.findOne({ _id: todo.project, members: { $in: [req.decoded.id] } })
                    .then((project) => {
                        if (!project) next({ name: 'Unauthorized' })
                        else next()
                    })
            }
            else if (todo.creator != req.decoded.id) next({ status: 403, msg: "Unauthorized" })
            else next()
        }).catch(next);
}

function stillOnProject(req, res, next) {
    Project.findById(req.params.id)
        .then((project) => {
            if (project.members.includes(req.decoded.id)) next()
            else next({ status: 403, msg: "You're not the project's member" })
        }).catch(next);
}

module.exports = {
    authentication,
    authorization,
    stillOnProject
}