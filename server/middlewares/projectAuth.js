'use strict'

const Project = require('../models/project')

module.exports = {
    authorize : (req, res, next) => {
        try {
          Project.findOne({
              _id : req.headers.id_project
          })
          .then(data =>{
            if(!data){
                throw {
                    status : 404,
                    message: 'project not found !'
                }
            }else{
                if(data.owner == req.user.id){
                    next()
                }else{
                    throw {
                        status :401,
                        message: 'unAuthorize !'
                    }
                }
            }
          })
          .catch(next)
        }
        catch(err){
            next(err)
        }
    },
    authorize2 : (req,res,next) => {
        try{
            Project.findOne({
                _id : req.headers.id_project
            })
            .then(data =>{
              if(!data){
                  throw {
                      status : 404,
                      message: 'project not found !'
                  }
              }else{
                  if(data.owner == req.user.id){
                      next()
                  }else if(data.members.includes(req.user.id)){
                    next()
                  }
                  else{
                      throw {
                          status :401,
                          message: 'unAuthorize !'
                      }
                  }
              }
            })
            .catch(next)
        }
        catch(err){
            next(err)
        }
    }
}