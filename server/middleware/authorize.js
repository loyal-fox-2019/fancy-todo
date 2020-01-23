"use strict"

const Todo = require('../models/todo')

function authorized(req, res, next) {
    // console.log(todo)
    Todo.find({ userId: req.user_id })
        .then((todo) => {
            if (!todo) {
                next({
                    status: 404,
                    message: 'data not found'
                })
            } else if (todo.userId === req.userId) {
                next()
            } else {
                next({
                    status: 401,
                    message: 'not authorized'
                })
            }
        }).catch((err) => {
            next(err)
        });
}

module.exports = authorized