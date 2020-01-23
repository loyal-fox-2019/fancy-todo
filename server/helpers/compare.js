function compare(loginPassword, userPassword) {
    const bcrypt = require('bcrypt');

    return bcrypt.compareSync(loginPassword, userPassword)
}

module.exports = compare
