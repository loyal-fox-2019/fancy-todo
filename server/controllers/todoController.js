const Todo = require('../models/Todo');

class todoController {
    static createTodo (req, res, next) {
        console.log(req.body);
        Todo.create(req.body)
        .then((result) => {
            res.status(201);
            res.json(result);
        }).catch((err) => {
            res.status(403);
            res.json(err);
        });
    }

    static listAllTodo (req, res, next) {
        const {UserId} = req.body;
        Todo.find({UserId})
        .then((result) => {
            res.status(200);
            res.json(result)
        }).catch((err) => {
            res.status(401);
            res.json(err)
        });
    }
}

module.exports = todoController;