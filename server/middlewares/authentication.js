const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers.hasOwnProperty('token')) {
        const token = req.headers.token;
        try {
            const user = jwt.verify(token, process.env.CLIENT_SECRET);
            req.userLogin = user;
            next();
        } catch(err) {
            res.status(400).json({msg: 'Invalid Token'});
        }
    }else{
        res.status(404).json({msg: 'Token Not Found'});
    }
}