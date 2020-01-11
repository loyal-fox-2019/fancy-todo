const {OAuth2Client} = require('google-auth-library');
const googleIdClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleTokenChecking = (req, res, next) => {
    if (!req.body.googleToken) {
        throw ({code: 401})
    }

    let googleToken = req.body.googleToken;

    async function verify() {
        const ticket = await googleIdClient.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        let payload = ticket.getPayload();
        let verified = payload.email_verified;

        if (verified) {
            req.userEmail = payload.email;
            next()
        } else {
            throw ({code: 401})
        }
    }

    verify().catch(err => {
        res.json({code: 401})
    });
};

module.exports = googleTokenChecking;