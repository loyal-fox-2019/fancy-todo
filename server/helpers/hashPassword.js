const bcrypt = require('bcryptjs');

function hashPassword(plaintext,saltRounds)
{
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(plaintext,salt);
    return hash;
}

module.exports = hashPassword;