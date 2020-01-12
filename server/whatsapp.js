const accountSID = 'ACd3b3ed8fb6f0c27fa76f633f29a242d4'
const authToken = '5a2547d0e4cac18d050b3e343eeb818f'
const client = require('twilio')(accountSID, authToken)

client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+6281385784854',
    body: 'SEKALI LAGI!'
})
    .then(msg => {
        console.log(msg.sid)
    })