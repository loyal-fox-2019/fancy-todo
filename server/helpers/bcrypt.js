const bcrypt = require('bcrypt')
const saltRounds = 10

function hash(plainPass){
    let hashedPass = bcrypt.hashSync(plainPass, saltRounds)
    return hashedPass
}

module.exports = hash