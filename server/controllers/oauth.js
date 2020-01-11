const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');
const {oauthModel} = require('../models/oauth');

class OAuthController {
  static login(req, res, next) {
    const gToken = req.body.idToken;
    let oauthPayload;

    client.verifyIdToken({
        idToken: gToken,
        audience: process.env.CLIENT_ID
    })
        .then((ticket) => {
            oauthPayload = ticket.getPayload();
            
            return oauthModel.findOne({
                userId: oauthPayload.sub
            })
        }).then((user) => {
            if (user) {
                return user;
            } else {
                return oauthModel.create({
                    userId: oauthPayload.sub,
                    username: oauthPayload.given_name,
                    password: 'notsafeforpassword',
                    name: oauthPayload.name,
                    email: oauthPayload.email,
                    avatar: oauthPayload.avatar
                });
            }
        }).then((registeredUser) => {
            const token = jwt.sign({
                userId: registeredUser.usesId,
                name: registeredUser.name,
                email: registeredUser.email,
                avatar: registeredUser.picture
            }, process.env.CLIENT_SECRET);
        
            res.status(200).json({token});
        }).catch(next);
  }
}

module.exports = {
  OAuthController
};
