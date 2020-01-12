const Project = require('../models/Project')
module.exports = function (req, res, next) {  
    console.log(req.params)
    Project
        .findOne({
            _id: req.params.id,
            members: {
                $in: [req.userId]
            }
        })
        .then(project => {
            if (project) {
                next()
            }else{
                res.status(401).json({
                  message: 'Access denied'  
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: 'id not found'
            })
        })
}