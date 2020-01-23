const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(plainPassword, salt);
    return hashedPassword;
}

module.exports = {
    hashPassword
};
