const jwt = require('jsonwebtoken');
const {userModel} = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const user = jwt.verify(token, process.env.CLIENT_SECRET);

        userModel.findOne({
            _id: ObjectId(user.id),
            email: user.email
        })
            .then((authenticatedUser) => {
                if (!authenticatedUser) {
                    // throw new Error('You are not a registered user');
                    res.status(400).json({msg: 'You are not registered'});
                } else {
                    req.userLogin = user;
                    next();
                }
            }).catch((err) => { 
                throw err;
            });
    } catch (err) {
        res.status(404).json({msg: 'Invalid Token'});
    }


    // if (req.headers.hasOwnProperty('token')) {
    //     const token = req.headers.token;
    //     try {
    //         const user = jwt.verify(token, process.env.CLIENT_SECRET);
    //         req.userLogin = user;
    //         next();
    //     } catch(err) {
    //         res.status(400).json({msg: 'Invalid Token'});
    //     }
    // }else{
    //     res.status(404).json({msg: 'Token Not Found'});
    // }
}