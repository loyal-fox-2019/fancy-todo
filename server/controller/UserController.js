const User = require('../model/User')
const { verifyHash } = require('../helper/bcryptjs')
const { generateToken } = require('../helper/jwt')

class UserController
{
    static test (req,res)
      {
          res.send('user connected')
      }

    
      static findAll(req,res,next)
      {
          User.find()    
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
      
    
      static masterDelete(req,res)
      {
          User.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static register (req,res,next)
      {
        const { username, email, password } = req.body
        
        User.create({
            username, email, password
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch((err)=>{
            next(err)
        })
      }


    static login (req,res,next)
      {
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(result =>{
            if(result === null)
              {
                next({
                    status:404,
                    message:'User not found'
                })
              }
            else if ( verifyHash(password, result.password))
              {
                  res.status(202).json({ 
                      token: generateToken({ _id:result._id })
                  })
              }
            else
              {
                  next({
                      status: 401,
                      message:"wrong username & password combination"
                  })
              }
        })
        .catch(err=>{
            next(err)
        })
      }
    
    
}

module.exports = UserController