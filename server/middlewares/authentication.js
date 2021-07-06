'use strict';
const { User } = require('../models');
const { verify } = require('../helpers/jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    const decoded = verify(token);
    User
      .findById(decoded._id)
      .then((user) => {
        if(!user) {
          next({ auth: true, status: 400, message: 'Token invalid' })
        } else {
          req.decoded = decoded;
          next();
        }
      })
  } else {
    next({ auth: true, status: 401, message: 'You have to login' });
  }
}