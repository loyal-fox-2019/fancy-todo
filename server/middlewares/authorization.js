const TodoModel = require('../models/todo')

function authorize(req,res,next) {
    TodoModel.findById(req.body.data.todoId)
    .then(data=>{
        if(data){
            if(data.user == req.user.userId) {
                next()
            }
            else {
                res.status(400).json({
                    message: "User not authorized"
                })
            }
        }
        else {
            res.status(404).json({
                message: 'Todo not found'
            })
        }
    })
}

module.exports = authorize