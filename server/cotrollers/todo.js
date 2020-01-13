'use strict'

const Todo = require('../models/todos')

class todoControllers {
    static getAll(req, res, next) {
        // console.log(req.decode)
        Todo.find({ userId: req.decode.userId})
        .then(result => {
            if(result.length === 0){
                res.status(202).json({message: 'make new first todo'})
            }
            else {

                res.status(202).json({result})
            }
        })
        .catch(next)
    }
    static getOne(req, res, next) {
        Todo.findById({ userId: req.params.id})
        .then(result => {
            if(!result){
                throw {status: 404, message: 'not found'}
            }
            else {

                res.status(202).json({result})
            }
        })
        .catch(next)
    }
    static delete(req, res, next) {
        Todo.findByIdAndDelete({ userId: req.params.id})
        .then(result => {
            if(!result){
                throw {status: 404, message: 'not found'}
            }
            else {

                res.status(202).json({result})
            }
        })
        .catch(next)
    }
    static update(req, res, next) {
        Todo.findByIdAndUpdate({ id: req.params.id})
        .then(result => {
            if(!result){
                throw {status: 404, message: 'not found'}
            }
            else {

                res.status(202).json({message: 'update success'})
            }
        })
        .catch(next)
    }
}

module.exports = todoControllers