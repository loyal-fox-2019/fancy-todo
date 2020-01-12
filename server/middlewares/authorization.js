const Todo = require('../models/todo')

module.exports = (req, res, next) => {
    Todo.findById(req.params.id)
        .then(todo => {
            console.log(todo)
            if (req.loginData.userId !== todo.user) {
                let errorStatus = {
                    code: 403,
                    status: 'Forbidden',
                    message: 'You Don\'t have access to this Todo'
                }
                throw errorStatus
            } else {
                next()
            }
        })
        .catch(next)
}