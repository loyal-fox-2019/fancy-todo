const User = require('../models/User')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async getUsers(req, res, next) {
    try {
      let user = await User.findOne({email: req.params.email})
      if (user) {
        res.status(201).json(user)
      } else {
        next({ status: 404, message: 'User not found!' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      let { name, email, password } = req.body
      email = email.toLowerCase()
      let user = await User.create({ name, email, password })
      let token = generateToken({ id: user._id })
      res.status(201).json({ token })
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      email = email.toLowerCase()
      let user = await User.findOne({ email })
      if (!user || !compare(password, user.password)) {
        next({ status: 404, message: 'Invalid Email or Password' })
      } else {
        let token = generateToken({ id: user._id })
        res.status(200).json({token})
      }
    } catch (error) {
      next(error)
    }
  }

  static async gsignin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID  
      })
      const payload = ticket.getPayload();
      let user = await User.findOne({ email: payload.email })
      if (user) {
        let token = generateToken({ id: user._id })
        res.status(200).json({token})
      } else {
        let { name, email } = payload
        let password = process.env.GOOGLE_DEFAULT_PASSWORD
        let user = await User.create({ name, email, password })
        let token = generateToken({ id: user._id })
        res.status(201).json({ token })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController