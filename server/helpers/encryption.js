const bcrypt = require('bcrypt')
const saltRounds = 5

function hashPass(passWord) {
    const hashed = bcrypt.hashSync(passWord, saltRounds)
    return hashed
}

module.exports = hashPass