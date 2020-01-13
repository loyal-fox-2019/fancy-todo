'use strict'

const { verifyToken } = require('../helpers/jwt.js')
const User = require('../models/user.js')
const Project = require("../models/project.js");

module.exports = {
  authentication (req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
      try {
        req.decoded = verifyToken(req.headers.access_token)
        User.findById(req.decoded.id)
          .then(user => {
            if (user) {
              next()
            } else {
              next({ status: 401, message: "Invalid access" })
            }
          })
          .catch(err => {
            next(err)
          })
      } catch(err) {
        next(err)
      }
    } else {
      throw { errorCode: 401, message: "You must log in first" }
    }
  },

  ownerAuthorization (req, res, next) {
    Project.findById(req.params.id)
      .then(data => {
        if (data) {
          if (String(data.user) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 401, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, message: `Project not found` });
        }
      })
      .catch(next)
  },

  memberAuthorization (req, res, next) {
    Project.findById(req.params.id)
      .then(data => {
        if (data) {
          if (data.members.includes(req.decoded.id)) {
            next();
          } else {
            next({ status: 401, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, message: `Resource not found` });
        }
      })
      .catch(next)
  }
}