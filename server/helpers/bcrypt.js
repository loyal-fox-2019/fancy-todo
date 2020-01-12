const bcrypt = require('bcrypt');
const saltRounds = 8 

function hasher(password){
    console.log("masuk hasher")
    let hashed = bcrypt.hashSync(password,saltRounds)
    console.log("hasil hash : "+hashed)
    return hashed
}

function verifier(password,hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hasher,
    verifier
};