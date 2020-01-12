const http = require('http')
const server = http.createServer(require('../app'))
const port = process.env.PORT || 7000

server.listen(port, ()=>{
    console.log('Server listening on port', port)
})
