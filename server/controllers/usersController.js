'use strict'

const User = require('../models/user.js')
const Project = require('../models/project.js')
const { generateToken } = require('../helpers/jwt.js')
const { validatePass } = require('../helpers/bcrypt.js')
const { OAuth2Client } = require('google-auth-library');
// const axios = require('axios')

class usersController {

  static findOne (req, res, next) {
    User.findOne({email: req.params.email}).select('-password').populate('tasks')
      .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          let err = {
            status: 404,
            message: 'Resource not found'
          }
          next(err)
        }
      })
      .catch(next)
  }

  static register (req, res, next) {
    const { name, email, password, avatar } = req.body
    User.create({
      name,
      email,
      password,
      avatar
    })
      .then(user => {
        let newUser = user.toObject();
        delete newUser.password;
        res.status(201).json(newUser);
      })
      .catch(next)
  }

  static login (req, res, next) {
    User.findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          let err = {
            status: 401,
            message: "Email and/or password incorrect"
          };
          next(err);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = {
            id : user._id,
            email : user.email
          };
          let token = generateToken(payload);
          res.status(200).json({access_token: token, name: user.name})
        } else {
          let err = {
            status: 401,
            message: "Email and/or password incorrect"
          };
          next(err);
        }
      })
      .catch(next)
  }

  static googleSignIn (req, res, next) {
    let personalInfo;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        personalInfo = ticket.getPayload()
        return User.findOne({ email: personalInfo.email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: personalInfo.name,
            email: personalInfo.email,
            password: process.env.DEFAULT_PASSWORD,
            avatar: personalInfo.picture
          })
        }
      })
      .then(user => {
        let payload = {
          id: user._id,
          email: user.email
        }
        let token = generateToken(payload)
        res.status(200).json({access_token: token, name: user.name})
      })
      .catch(next)
  // }
    // let personalInfo;
    // axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.body.id_token}`)
    // .then(({ data }) => {
    //   personalInfo = data;
    //   return User.findOne({ email: data.email })
    // })
    // .then(user => {
    //   if (user) {
    //     return user
    //   } else {
    //     return User.create({
    //       name: personalInfo.name,
    //       email: personalInfo.email,
    //       password: process.env.DEFAULT_PASSWORD,
    //       avatar: personalInfo.picture
    //     })
    //   }
    // })
    // .then(user => {
    //   let payload = {
    //     id : user._id,
    //     email : user.email
    //   };
    //   let token = generateToken(payload);
    //   res.status(200).json({access_token: token})
    // })
    // .catch(next)
  }

  
  // static findTasks (req, res, next) {
  //   Project.find({ members: req.decoded.id })
  //     .populate('tasks.task')
  //     .then(projects => {
  //       let arr = []
  //       projects.forEach(project => {
  //         project.tasks.forEach(task => {
  //           arr.push(task)
  //         })
  //       })
  //       res.status(200).json(arr);
  //     })
  //     .catch(next)
  // }
}

module.exports = usersController