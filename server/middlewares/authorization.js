const {Todo} = require('../models');

module.exports = (req, res, next) => {
    const options = {
        where: {
            id:req.params.id
        }
    };

    Todo.findOne(options)
        .then((todo) => {
            if (!todo) {
                res.status(404).json({msg: 'Todo Not Found'});
            } else if (todo.getUser !== req.userLogin.id) {
                res.status(401).json({msg: 'You Are Not Authorized'});
            } else {
                next();
            }
        }).catch((err) => {
            res.status(500).json({msg: 'Internal Server Error'});
        });
};
