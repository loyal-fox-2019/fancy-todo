'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 8;

function generateHash(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    generateHash,
    compareHash
}