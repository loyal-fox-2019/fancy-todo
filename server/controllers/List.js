const List = require('../models/list')

module.exports = class {
    static addTodo(req, res, next) {
        List.create({
            todo: req.body.todo,
            desc: req.body.desc,
            status: req.body.status,
            user: req.headers.id,
            due_date: new Date()
        })
            .then(data => {
                console.log(data);
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findTodo(req, res, next) {
        List.find({ user: req.headers.id })
            .populate('user')
            .exec()
            .then(data => {
                console.log(data);
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err })
            })
    }
}