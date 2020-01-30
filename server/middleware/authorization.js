'use strict';

const Todo = require('../models/todo');
const Jwt = require('../helper/jwt');

function authorization(req, res, next) {
    const payload = Jwt.decodeToken(req.headers.usertoken);
    Todo.findOne({_id: req.body.todo_id})
    .then(todo => {
        if(todo.user_id == payload.data) {
            next();
        } else {
            res.status(403).json({
                name: 'Forbidden',
                message: "You don't have permission to update / delete this todo"
            })
        }
    })
}

module.exports = authorization;