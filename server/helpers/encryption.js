
const bcrypt = require('bcrypt')

function hash(password){
    const hashedPassword = bcrypt.hashSync(password, 5);
    return hashedPassword
}

function decode(password,hash){
    const decoded = bcrypt.compareSync(password, hash);
    return decoded
}

module.exports = {
    hash,decode
}