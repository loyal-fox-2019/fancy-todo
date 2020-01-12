function generateToken(user) {
    let jwt = require('jsonwebtoken');
    const ObjectId = require('mongoose').ObjectId;
    let token = jwt.sign({
        id: new ObjectId(user._id).path,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET);

    return token
}

module.exports = generateToken