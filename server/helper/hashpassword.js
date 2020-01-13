const bcrypt = require('bcrypt')
const salt = 5


class Passwordhash{
    static hash(plaintext){
        return new Promise (function(resolve, reject){
            bcrypt.genSalt(salt,function(err,salt){
                bcrypt.hash(plaintext,salt, function(err, hash){
                    if(err){
                        reject(err)
                    } else{
                        resolve(hash)
                    }  
                })
            })
        })
    }

    static compare(plaintext, hasedpassword){
        return new Promise(function(resolve,reject){
            bcrypt.compare(plaintext,hasedpassword,function(err, status){
                resolve(status)
            })
        })
    }
}



module.exports = Passwordhash