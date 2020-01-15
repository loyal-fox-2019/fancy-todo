'use strict'

const bcrypt = require('bcryptjs')

const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, 8)
const checkPassword = (plainPassword, hashPassword) => bcrypt.compareSync(plainPassword, hashPassword)

module.exports = {
    hashPassword,
    checkPassword
}