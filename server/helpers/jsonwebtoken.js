'use strict';
const jsonwebtoken = require('jsonwebtoken');

function signPayload(payload) {
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
  return token;
}

function verify(token) {
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = {
  signPayload,
  verify
};
