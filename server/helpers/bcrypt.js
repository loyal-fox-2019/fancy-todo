const bcrypt = require('bcryptjs')

function hashPassword (pass){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}
function comparePassword (pass, passHash) {
    return bcrypt.compareSync(pass, passHash)
}

module.exports = {
    hashPassword,
    comparePassword
}