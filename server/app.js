if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
}

require('./config/mongoose')
const port = process.env.PORT || 3000
const express = require('express'),
    http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const errHandler = require('./middlewares/errorHandler')
const router = require('./routes/index')
const cors = require('cors')
let groups = []

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    socket.removeAllListeners()
    socket.on('join', function(room) { 
        console.log('joining room', room);
        socket.join(room); 
    })

    socket.on('leave', function(room) {  
        console.log('leaving room', room);
        socket.leave(room); 
    })

    socket.on('send', function(data) {
        console.log(data)
        console.log('sending message');
        io.sockets.in(data.room).emit('message', data);
    });
});

app.use('/',router)


app.use(errHandler)

server.listen(port,()=>{
    console.log(`listening on port ${port}`)
})