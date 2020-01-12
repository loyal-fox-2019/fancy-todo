const bcrypt = require('bcrypt');
const saltRounds = 10;


function passHash(password){
    return new Promise ((res, rej)=>{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                 if(err){
                     rej(err)
                 }else{
                     res(hash)
                 }
            })
        })
    }
    )
}


module.exports = passHash