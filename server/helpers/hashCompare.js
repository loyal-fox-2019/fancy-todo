const bcrypt = require('bcrypt');

function hashCompare(password, hashedPassword) {
    const isValid = bcrypt.compareSync(password, hashedPassword);
    return isValid;
}

module.exports = hashCompare;