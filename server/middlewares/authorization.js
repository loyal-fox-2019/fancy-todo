// dapet payload dari authen
// cek ke db todo id berdasarkan params
// cek user_id di todo tsb
// kalau bener bagus
// kalau salah throw error
const Todo = require('../models/todo')

module.exports = (req,res,next) => {
    try{
        Todo.findOne({user_id: req.loggedIn.id})
            .then(data => {
                if(data.user_id == req.loggedIn.id){
                    next()
                }else{
                    throw new Error(`Not authorized!`)
                }
            })
    }
    catch(err){
        next(err)
    }
}