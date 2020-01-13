const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(val) {
    // return (val)

    const ticket = await client.verifyIdToken({
        idToken: val,
        audience: process.env.CLIENT_ID
    });
    // console.log(ticket)
    const payload = ticket.getPayload();
    return payload
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

module.exports = verify