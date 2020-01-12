const jwt = require('jsonwebtoken');

function generator(payload){
    return token = jwt.sign(payload,process.env.JWTSECRET)
}

module.exports = {
    generator
};
