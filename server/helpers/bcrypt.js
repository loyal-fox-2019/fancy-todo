'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword(userInputPassword) {
  const hash = bcrypt.hashSync(userInputPassword, salt);
  return hash;
}

function compare(userInputPassword, databasePassword) {
  return bcrypt.compareSync(userInputPassword, databasePassword);
}

module.exports = {
  hashPassword,
  compare,
};
