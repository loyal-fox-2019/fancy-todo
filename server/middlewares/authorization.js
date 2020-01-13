const User = require('../models/user')
const Todo = require('../models/todo')


module.exports = (req,res,next)=>{
    let idUser=null
    // console.log(req.body.payload)
    if(req.body.hasOwnProperty('payload')){
        User.findOne({username: req.body.payload.username})
        .then(user=>{
            // console.log(user)
            idUser = user._id
            // console.log('payload', req.body)
            if(user.username==req.body.payload.username){
                // console.log('masuk sini')
                return Todo.findOne({userId: user._id})
            }else{
                throw new Error('user not found')
            }
        })
        .then(todo=>{
            // console.log(todo)
            if(todo){
                if(todo.userId==idUser){
                    // console.log('masuk woy')
                    // console.log(todo)
                    next()
                }else{
                    throw new Error('You Are NOt Authorized')
                }
            }else{
                throw new Error('Todo not found')
            }
        })
        .catch(next)
    }else{
        throw new Error('please login first')
    }
}