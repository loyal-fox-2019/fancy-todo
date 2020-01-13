const bcrypt = require('bcrypt');
const saltRounds = 10;

function passCheck(password, hash){
    return new Promise((resolve, rej)=>{
        bcrypt.compare(password, hash, function(err, res) {
            if(err){
                rej(err)
            }else{
                // console.log(res)
                resolve(res)
            }
        });
    })
}


module.exports = passCheck