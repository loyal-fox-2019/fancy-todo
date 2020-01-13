"use strict"

module.exports = function(err, req, res, next) {
    res.json(err)

    if(err.name === 'CastError') {
        res.status(404).json({error: err.message});
    }

    if(err.name === 'ValidationError') {
        res.status(422).json({error: err.message});
    }
}