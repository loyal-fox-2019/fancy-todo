'use strict';

const { verifyToken } = require('./jwt');
const Todo = require('../models/todo');

function authentication(req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            let { id } = verifyToken(req.headers.token);
            req.userLoggedIn = id;
            next();
        }
        catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(500).json({
            message: 'User not logged in'
        });
    }
}

function authorizeTodo(req, res, next) {
    let userId = req.userLoggedIn;
    Todo.findById(userId)
    .then(todo => {
        if(todo) {
            next();
        } else {
            res.status(404).json({
                message: 'User todo not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

module.exports = {
    authentication,
    authorizeTodo
}