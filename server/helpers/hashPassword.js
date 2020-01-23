const bcrypt = require('bcrypt')

function hashPassword(plainPass){
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(plainPass, salt)

    return hash
}

module.exports = hashPassword