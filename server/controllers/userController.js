const User = require('../models/User')
const jwt = require('../helpers/token')
const bcrypt = require('../helpers/bcrypt')
const axios = require('axios')

class userController{
  static register(req, res, next){
    const { username, email, password } = req.body
    User
      .create({
        username,
        email,
        password
      })
      .then((userData) => {
        let token = jwt.sign({
          id: userData._id,
          username: userData.username
        })
        res.status(201).json({token, id: userData._id, username: userData.username})
      })
      .catch(next)
  }

  static login(req, res, next){
    const { user, password } = req.body
    User
      .findOne({
        $or: [
          {username: user},
          {email: user}
        ]
      })
      .then((userData) => {
        if (userData){
          if (bcrypt.compare(password, userData.password)){
            let token = jwt.sign({
              id: userData._id,
              username: userData.username
            })
            res.status(200).json({token, id: userData._id, username: userData.username})
          }
          else {
            next({
              errorCode: 400,
              message: 'Wrong credentials'
            })
          }
        }
        else {
          next({
            errorCode: 400,
            message: 'Wrong credentials'
          })
        }
      })
      .catch(next)
  }

  static loginOAuth(req, res, next){
    const { token } = req.body
    let googleData = {}
    axios({
      method: 'GET',
      url: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    })
      .then(({data}) => {
        googleData = data
       return User
        .findOne({
          email: data.email
        })
      })
      .then((user) => {
        if (user) {
          return user
        }
        else {
          return User
            .create({
              username: googleData.name,
              email: googleData.email,
              password: process.env.DEFAULT_PASS
            })
        }
      })
      .then((userData) => {
        let token = jwt.sign({
          id: userData._id,
          username: userData.username
        })
        res.status(200).json({token, id: userData._id, username: userData.username})
      })
      .catch(next)
  }

  static relog(req, res, next){
    try{
      let userData = jwt.verify(req.headers.token)
      req.userData = userData
      res.status(200).json({token: req.headers.token, id: userData.id, username: userData.username})
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = userController