const bcrypt = require('bcrypt')

function comparePassword(pass, hash){
    let match =  bcrypt.compareSync(pass, hash)
    if(match){
        return true
    }else{
        return false
    }
}

module.exports = comparePassword

