'use strict';
if (process.env.NODE_ENV === 'development') require('dotenv').config();
const { User } = require('../models');
const { signPayload } = require('../helpers/jsonwebtoken');
const { compare } = require('../helpers/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static loginGoogle(req, res, next) {
    const data = {}
    let registered = false;
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => {
        const { name, email, jti } = ticket.payload;
        data.name = name;
        data.email = email;
        data.password = 123456;
        return User.findOne({ email })
      })
      .then((user) => {
        if (!user) {
          registered = false
        } else {
          registered = true
        }
        if (!registered) {
          return User.create(data)
        } else {
          return user
        }
      })
      .then((userCreated) => {
        const { _id, name, email } = userCreated;
        const payload = {
          _id,
          email
        };
        const token = signPayload(payload);
        res.status(202).json({ name, token })
      })
      .catch(next)
  } 

  static async register(req, res, next) {
    const { name, email, password } = req.body;
    const userData = {
      name,
      email,
      password
    };
    try {
      const userCredential = await User.create(userData);
      const { _id, name, email } = userCredential;
      const payload = {
        _id,
        email,
      };
      const token = signPayload(payload);
      res.status(201).json({ name, token });
    } catch (err) {
      next(err);
    };
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then((user) => {
        if(user) {
          if (compare(password, user.password)) {
            const { name, email, _id } = user;
            const payload = {
              email,
              _id,
            }
            const token = signPayload(payload);
            res.status(202).json({ name, token });
          } else {
            next({ auth: true, status: 403, message: 'Email or password is wrong!' });
          }
        } else {
          next({ auth: true, status: 403, message: 'Email or password is wrong!' });
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
