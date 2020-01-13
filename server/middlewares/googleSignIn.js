'use strict'

const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('823089076899-97q16rugeouqo2c2pn0sn8htj365pmqd.apps.googleusercontent.com')

module.exports = (req,res,next) => {
    if(!req.headers.id_token )
    {
      next({status: 406, message: 'token not provided'})
    }

  client.verifyIdToken({
      idToken: req.headers.id_token,
      audience: '823089076899-97q16rugeouqo2c2pn0sn8htj365pmqd.apps.googleusercontent.com',      
  })
  .then( ticket => {
      const payload = ticket.getPayload();
      req.decoded = payload  
      next()  
  })
  .catch(err => {
      console.log(err)
  })  
}