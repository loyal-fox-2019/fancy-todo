const ObjectId = require('mongoose').Types.ObjectId;
const {todoModel} = require('../models/todo');

class TodoController {
    static addNewTodo(req, res, next) {
        todoModel.create({
            name: req.body.name,
            description: req.body.description,
            status: ObjectId(req.body.status),
            project: ObjectId(req.body.project),
            due_date: new Date(req.body.due_date)
        })
            .then((createdTodo) => {
                res.status(201).json({createdTodo});
            }).catch(next);
    }

    static getAllTodos(req, res, next) {
        todoModel.find().populate(['project','status'])
            .then((todos) => {
                res.status(200).json({todos});
            }).catch(next);
    }

    static updateTodoById(req, res, next) {
        todoModel.findOne({
            _id: ObjectId(req.params.id)
        })
            .then((todo) => {
                if (!todo) {
                    let errors = new Error('Todo not found');
                    errors.status = 404;
                    errors.msg = 'Todo not found';
                    errors.data = todo;
                    throw errors;
                }

                return todoModel.update({
                    _id: ObjectId(req.params.id)
                }, req.body);
            }).then((updatedTodo) => {
                res.status(200).json({updatedTodo});
            }).catch(next);
    }

    static deleteTodoById(req, res, next) {
        todoModel.deleteOne({
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
