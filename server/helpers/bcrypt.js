const bcryptjs = require('bcryptjs')

module.exports = {
  hash(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(6))
  },
  compare(password, hash) {
    return bcryptjs.compareSync(password, hash)
  }
}