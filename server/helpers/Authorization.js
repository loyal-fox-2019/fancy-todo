const jwt = require('jsonwebtoken')
const modelUser = require('../models/modelUser')
const modelTodo = require('../models/modelTodo')


function toCreate(req, res, next) {
    modelUser.findById(req.payload.id)
        .then(ketemu => {
            if (ketemu) {
                console.log(ketemu, "ini ketemu dari authorization")
                next()
            } else {
                res.status(403).json({ message: "You are forbidden to this" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal server User in Authorization" })
        })
}

function toUpdateOrDelete(req, res, next) {
    // console.log(req.params, "ini params")
    // console.log(req.payload, "ini payload")
    // console.log(req.payload.id, "ini id dari payload")
    modelUser.findById(req.payload.id)
        .then(ketemuUsernya => {
            if (ketemuUsernya) {
                // var Obj = require("mongoose").Schema.Types.ObjectId
                // console.log(ketemuUsernya, "ini ketemu uusernya")

                return modelTodo.findById(req.params.id).populate(['userId'])

                // modelTodo.findById(req.params.id).populate(['userId'])
                // return modelTodo.find().populate(['userId'])

            }
            else {
                res.status(403).json({ message: "You are forbidden to this" })
            }
        })
        .then(ketemuTodonya => {
            // console.log(ketemuTodonya, "ini ketemuTodonya")
            if (ketemuTodonya) {
                // console.log(ketemuTodonya)
                // console.log("hai dari sinni")
                // console.log(ketemuTodonya.userId.id, "ini userId")
                // console.log(req.payload.id, "ini user dari payload")

                if (ketemuTodonya.userId.id === req.payload.id) {
                    // console.log("ok boleh")
                    next()
                } else {
                    // console.log("heh siapa loe")
                    res.status(403).json({ message: "You are forbidden to do this action" })
                }
            } else {
                res.status(400).json({ message: "id of the todo list does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = { toCreate, toUpdateOrDelete }