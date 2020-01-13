const BCrypt = require('bcrypt');
const salt = BCrypt.genSaltSync(10);

const createBCryptHash = (plainText) => {
    return BCrypt.hashSync(plainText, salt);
};

const compareBCrypthash = (plainText, hash) => {
    return BCrypt.compareSync(plainText, hash);
};

module.exports = {
    createBCryptHash,
    compareBCrypthash
};