const bcrypt = require('bcrypt')
const saltRounds = 10;

function hashPassword(password) {
    const hashed = bcrypt.hashSync(password, saltRounds)
    return hashed
}
function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}