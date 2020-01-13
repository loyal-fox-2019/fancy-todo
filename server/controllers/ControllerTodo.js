const {Todo} = require('../models/modelTodo');
const {Project} = require('../models/modelProject');

class ControllerTodo {
    static createTodo(req, res, next) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            status: "Open",
            user_id: req.user_id,
            project: req.projectId
        }).then(responseTodo => {
            return Project.updateOne({
                _id: req.projectId
            }, {
                $push: {
                    todos: responseTodo._id
                }
            })
        }).then(responseProject => {
            res.status(201).json({
                message: "Todo successfully created",
                data: responseProject
            });
        }).catch(next)
    }

    static viewTodo(req, res, next) {
        Todo.findOne({
            name: req.params.todoName
        }).populate('user_id', 'email')
            .then(response => {
                res.status(200).json({
                    data: response
                });
            }).catch(next)
    }

    static updateTodo(req, res, next) {
        if (!req.body.name ||
            !req.body.description ||
            !req.body.status ||
            !req.body.due_date
        ) throw ({
            name: "ValidationError",
            errMgs: "Todo data required"
        });

        Todo.updateOne({
            _id: req.params.idTodo,
            user_id: req.user_id
        }, {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }).then(response => {
            res.status(200).json({
                message: "Todo successfully updated",
                data: response
            });
        }).catch(next)
    }

    static deleteTodo(req, res, next) {
        Todo.deleteOne({
            _id: req.params.idTodo,
            user_id: req.user_id
        }).then(response => {
            res.status(200).json({
                message: "Todo successfully deleted",
                data: response
            });
        }).catch(next)
    }

    static updateStatus(req, res, next) {
        Todo.updateOne({
            _id: req.params.idTodo
        },{
            status: 'done'
        }).then(response => {
            res.status(200).json({
                message: "Todo status successfully updated",
                data: response
            });
        }).catch(next)
    }
}

module.exports = ControllerTodo;