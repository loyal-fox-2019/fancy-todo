function hashPassword(password) {
    const bcrypt = require('bcrypt');
    const saltRounds = 8;
    return bcrypt.hash(password, saltRounds)
}

module.exports = hashPassword
