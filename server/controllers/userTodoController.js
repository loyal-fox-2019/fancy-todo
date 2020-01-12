'use strict'

class UserTodoController {

    static createUserTodo(req, res, next) {
        res.send('create user todo')
    }

    static updateUserTodo(req, res, next) {
        res.send('update user todo')
    }

    static getAllUserTodo(req, res, next) {
        res.send('get All User Todo')
    }

    static changeUserTodoStatus(req,res,next) {
        res.send('change todo status')
    }
}

module.exports = UserTodoController