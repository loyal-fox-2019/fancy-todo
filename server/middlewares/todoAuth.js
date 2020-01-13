'use strict'

const Todo = require('../models/todo')

module.exports = {
    authorize : (req, res, next) => {
        try {
            Todo.findOne({_id : req.params.id})
            .then(data =>{
                if(!data){
                    throw {
                        status : 404,
                        message: 'todo not found !'
                    }
                }else{
                    if(data.user == req.user.id){
                        next()
                    }else{
                        throw {
                            status :401,
                            message: 'unAuthorize !'
                        }
                    }
                }
            })
            .catch(next)
        }
        catch(err){
            next(err)
        }
    }
}