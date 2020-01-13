const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const { ErrorHandler, generateToken } = require('../helpers');

class UserController {
  static signIn(req, res, next) {
    let payload = null;
    const client = new OAuth2Client(process.env.GOOG_CLIENT_ID);
    const { id_token } = req.body;

    // verify id dulu
    client
      .verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOG_CLIENT_ID
      })
      .then(ticket => {
        if (!ticket) {
          throw new ErrorHandler(400, `Wrong CLIENT_ID`);
        } else {
          payload = ticket.getPayload();
          const { email, name } = payload;
          return User.findOne({ email });
        }
      })
      .then(user => {
        const { email, name } = payload;
        if (user) {
          const token = generateToken(user._id);
          res.status(200).json({ token, name });
        } else {
          return User.create({
            email,
            name,
            password: process.env.DEFAULT_PASSWORD
          });
        }
      })
      .then(data => {
        const token = generateToken(data._id);
        const { name } = payload;
        res.status(200).json({ token, name });
      })
      .catch(err => {
        console.log('=========================');
        console.log(err);
        next(err);
      });
  }

  // static register(req, res, next) {}
}

module.exports = UserController;
