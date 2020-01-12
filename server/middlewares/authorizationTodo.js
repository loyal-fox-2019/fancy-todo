const {Todo} = require("../models/modelTodo");

const authorization = (req, res, next) => {
    if (!req.params.idTodo) throw({
        name: "ValidationError",
        errMsg: "Id Todo required"
    });

    Todo.findOne({
        _id: req.params.idTodo
    }).then(response => {
        if (response) {
            if (req.user_id.toString() === response.user_id.toString()) {
                next()
            } else {
                throw ({code: 401})
            }
        } else {
            throw ({
                code: 404,
                errMsg: "Todo"
            })
        }
    }).catch(next)
};

module.exports = authorization;