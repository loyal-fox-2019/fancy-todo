const modelTodo = require('../models/modelTodo')
const ObjectId = require('mongoose').Types.ObjectId
const modelUser = require('../models/modelUser')

class ControlTodo {
    static createTodo(req, res, next) {
        // console.log(req.body)
        // console.log(req.headers.token, "ini token dari header di control todo")
        // console.log(req.payload, "ini payload dari createTodo")
        // console.log("halo dari createTodo Controler")
        modelUser.findById(req.payload.id)
            .then(idFound => {
                // console.log(idFound)
                if (idFound) {
                    // console.log(idFound._id)
                    return modelTodo.create({
                        userId: idFound._id,
                        name: req.body.name,
                        description: req.body.description,
                        status: req.body.status,
                        due_date: req.body.due_date
                    })

                } else {
                    res.status(500).json({ message: "error dari modelUser createTodo, idnotfound" })
                }
            })
            .then(todoCreated => {
                res.status(200).json({ todoCreated, message: "Your todo list has been successfully created" })
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error from createTodo" })
            })
    }

    static findAllMyTodo(req, res, next) {
        modelTodo.find().populate(['userId'])
            .then(semuaTodo => {
                if (!semuaTodo[0]) {
                    res.status(200).json({ semuaTodo, message: "User has no to do" })
                } else {
                    res.status(200).json(semuaTodo)
                }
            })
    }
    static updateTodo(req, res, next) {
        // console.log(req.params.id)
        modelTodo.findByIdAndUpdate(req.params.id, req.body)
            .then(updated => {
                console.log(updated)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error from updateTodo" })
            })
    }

    static deleteTodo(req, res, next) {
        modelTodo.findByIdAndDelete(req.params.id)
            .then(foundTodoAndDelete => {
                // console.log(foundTodoAndDelete)
                if (foundTodoAndDelete) {
                    res.status(200).json({ foundTodoAndDelete, message: "To do successfully deleted" })
                } else {
                    res.status(400).json("Todo Not Found")
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error from deleteTodo" })
            })
    }

}
module.exports = ControlTodo