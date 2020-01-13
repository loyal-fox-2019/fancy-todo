if(process.env.NODE_ENV === 'development')
{
    require('dotenv').config()
    require('./config/mongoose')
}

const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(require('./router'))
app.use(require('./middlewares/errorHandler'))
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}!!`)
})