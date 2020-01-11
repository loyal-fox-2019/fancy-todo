'use strict';

const bcrypt = require('bcrypt');
const saltRound = 8;

class Bcrypt {
    static hashPassword(password) {
        return bcrypt.hashSync(password, saltRound);
    }

    static comparePassword(password, salt) {
        return bcrypt.compareSync(password, salt);
    }
}

module.exports = Bcrypt;