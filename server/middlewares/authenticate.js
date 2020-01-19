const jwt = require('../helpers/token')

function authenticate(req, res, next){
  try{
    let userData = jwt.verify(req.headers.token)
    req.userData = userData
    next()
  }
  catch(err){
    next(err)
  }
}

module.exports = authenticate