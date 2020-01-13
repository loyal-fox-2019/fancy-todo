const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {comparePassword} = require('../helpers/bcrypt')

class UserController {

   static async register(req, res, next) {
      try {
         const {username, email, password} = req.body

         const user = await User.create({username, email, password})
         
         const token = jwt.sign({
            userId: user._id,
            email
         }, process.env.JWT_SECRET)

         res.status(201).json({token, userId: user._id})
      }
      catch (error) {
         next(error)
      }
   }

   static async login(req, res, next) {
      try {
         const {email, password} = req.body

         const user = await User.findOne({email})

         if(!user || !comparePassword(password, user.password)) throw {
            errorCode: 404,
            message: 'Email and password combination is invalid'
         }
         else {
            const token = jwt.sign({
               userId: user._id,
               email
            }, process.env.JWT_SECRET)

            res.status(200).json({token, userId: user._id})
         }
      }
      catch (error) {
         next(error)
      }
   }

   static async deleteOne(req, res, next) {
      try {
         if(!req.params || !req.params.id) throw {
            errorCode: 400,
            message: 'Need to specify user id'
         }

         const results = await User.findOneAndRemove({_id: req.params.id})

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }
}

module.exports = UserController