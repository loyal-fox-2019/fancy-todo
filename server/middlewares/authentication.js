const jwt = require('jsonwebtoken');

function authenticate(req,res,next)
{    
    if(req.headers.hasOwnProperty("token"))
    {
        try {
            const payload = jwt.verify(req.headers.token,process.env.JWT_SECRET);
            req.userInfo = payload;
            next();
        }
        catch {
            res.status(401).json({
                error: "Please sign in first"
            });
        }
    }
    else
    {
        res.status(401).json({
            error: "Please sign in first"
        });
    }

    
}

module.exports = authenticate;