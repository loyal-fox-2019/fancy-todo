function generateToken(user) {
    let jwt = require('jsonwebtoken');
    let token = jwt.sign(user, process.env.JWT_SECRET);

    return token
}

module.exports = generateToken