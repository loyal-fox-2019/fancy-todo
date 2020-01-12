const Todo = require("../models/todo");

function authorisation(req,res,next)
{
    Todo.findById(req.params.id)
    .then((todo) => {
        if(todo.user !== req.userInfo.id)
        {
            res.status(403).json({
                error: "Not authorised"
            });
        }
        else
        {
            next();
        }
    })
    .catch(() => {
        res.status(400).json({
            error: "Invalid request"
        });
    });
}

module.exports = authorisation;
