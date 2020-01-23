const ObjectId = require('mongoose').Types.ObjectId;
const {todoModel} = require('../models/todo');

class TodoController {
    static addNewTodo(req, res, next) {
        todoModel.create({
            name: req.body.name,
            description: req.body.description,
            status: ObjectId(req.body.status),
            project: ObjectId(req.body.project),
            due_date: req.body.due_date,
            owner: ObjectId(req.userLogin.id)
        })
            .then((createdTodo) => {
                res.status(201).json({createdTodo});
            }).catch(next);
    }

    static getAllTodos(req, res, next) {
        todoModel.find({
            owner: req.userLogin.id
        }).populate(['project','status','owner'])
            .then((todos) => {
                res.status(200).json({todos});
            }).catch(next);
    }

    static getAllTodosByStatus(req, res, next) {
        todoModel.find({
            owner: req.userLogin.id,
            status: ObjectId(req.params.statusId)
        }).populate(['project','status','owner'])
            .then((todos) => {
                res.status(200).json({todos});
            }).catch(next);
    }

    static getTodoById(req, res, next) {
        todoModel.findOne({
            _id: ObjectId(req.params.id)
        }).populate(['owner','status'])
            .then((todo) => {
                res.status(200).json({todo});
            }).catch(next);
    }

    static updateTodoById(req, res, next) {
        todoModel.findOne()
            .then((todo) => {
                if (!todo) {
                    let errors = new Error('Todo not found');
                    errors.status = 404;
                    errors.msg = 'Todo not found';
                    errors.data = todo;
                    throw errors;
                }

                return todoModel.updateOne({
                    _id: ObjectId(req.params.id)
                }, req.body);
            }).then((updatedTodo) => {
                res.status(200).json({updatedTodo});
            }).catch(next);
    }

    static deleteTodoById(req, res, next) {
        todoModel.deleteOne({
            owner: req.userLogin.id,
            _id: ObjectId(req.params.id)
        })
            .then((deleteResult) => {
                res.status(200).json(deleteResult);
            }).catch(next);
    }
}

module.exports = {
    TodoController
};
