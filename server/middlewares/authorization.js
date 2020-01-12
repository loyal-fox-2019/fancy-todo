const ObjectId = require('mongoose').Types.ObjectId;
const {todoModel} = require('../models/todo');
const {projectModel} = require('../models/project');

module.exports = (req, res, next) => {
    res.status(200).json({userLogin: req.userLogin});
    // todoModel.find({
    //     _id: ObjectId(req.params.id)
    // }).populate('')
    //     .then((todo) => {
    //         if (!todo) {
    //             res.status(404).json({msg: 'Todo Not Found'});
    //         } else if (todo.getUser !== req.userLogin.id) {
    //             res.status(401).json({msg: 'You Are Not Authorized'});
    //         } else {
    //             next();
    //         }
    //     }).catch((err) => {
    //         res.status(500).json({msg: 'Internal Server Error'});
    //     });
};
