const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

function verifyGoogleToken(req,res,next)
{
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: CLIENT_ID
    })
    .then(()=>{next()})
    .catch(() => {
        res.status(400).json({
            msg: "invalid request"
        })
    })
}

module.exports = verifyGoogleToken;
