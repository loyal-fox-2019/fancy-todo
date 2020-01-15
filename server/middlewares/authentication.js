const jwt = require('jsonwebtoken');
const User = require("../models/user");

function authenticate(req,res,next)
{
    try {
        const payload = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        User.findOne({username: req.body.username})
        .then((user) => {
            req.userInfo = payload;
            next();
        })
        .catch(() => {
            throw new Error;
        });

        
    }
    catch {
        res.status(401).json({
            error: "Please sign in first"
        });
    }
    
}

module.exports = authenticate;