const bcrypt = require('bcryptjs')

class Bcrypt{
  static hash(password){
    return bcrypt.hashSync(password, 8)
  }

  static compare(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
  }
}

module.exports = Bcrypt