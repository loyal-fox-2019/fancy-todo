const ObjectId = require('mongoose').Types.ObjectId;
const {todoModel} = require('../models/todo');
const {projectModel} = require('../models/project');

module.exports = (req, res, next) => {
    const {userLogin} = req;
    todoModel.findOne({
        _id: ObjectId(req.params.id)
    }).populate('owner')
        .then((todo) => {
            if (!todo) {
                res.status(404).json({msg: 'Todo Not Found'});
            } else if (todo.owner._id != req.userLogin.id || todo.owner.email != req.userLogin.email) {
                res.status(401).json({msg: 'You Are Not Authorized'});
            } else {
                next();
            }
        }).catch((err) => {
            res.status(500).json({msg: 'Internal Server Error'});
        });
};
