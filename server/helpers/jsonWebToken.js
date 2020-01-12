const JWToken = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const createJWToken = (userId, email, role) => {
    return JWToken.sign(
        {
            userId: userId,
            email: email,
            role: role
        },
        SECRET_KEY,
        {expiresIn: '2 days'}
    );
};

const verifyJWToken = (token) => {
    try {
        return JWToken.verify(token, SECRET_KEY);
    } catch (err) {
        throw({
            code: 401
        })
    }
};

module.exports = {
    createJWToken,
    verifyJWToken
};