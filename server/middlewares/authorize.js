const Todo = require('../models/todo');
const { ObjectId } = require('mongoose').Types;
module.exports = (req, res, next) => {
    const { userInfo } = req
    // console.log(userInfo);
    // console.log(req.params);
    Todo.findById({
        _id: ObjectId(req.params.id)
    })
        .then((todo) => {
            console.log(todo);
            if (!todo) {
                next({
                    status: 404,
                    msg: 'Todo not found'
                })
            } else {
                console.log(todo.userId != userInfo.id);
                if (todo.userId != userInfo.id) {
                    next({
                        status: 403,
                        msg: 'Forbidden Access'
                    })
                } else {
                    next()
                }
            }
        })
        .catch((err) => {
            next(err)
        });
}
