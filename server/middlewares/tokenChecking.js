const {verifyJWToken} = require('../helpers/jsonWebToken');

const tokenChecking = (req, res, next) => {
    if (!req.headers.authorization) {
        throw ({
            code: 401
        })
    }

    let token = req.headers.authorization.split(" ")[1];
    let verifyToken = verifyJWToken(token);
    req.user_id = verifyToken.userId;
    req.email = verifyToken.email;
    req.role = verifyToken.role;
    next();
};

module.exports = tokenChecking;