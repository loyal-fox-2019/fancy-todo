if (process.env.NODE_ENV === 'development')
{
    require('dotenv').config()
    require('./config/mongo')
}

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(require('morgan')('combined'))

app.use('/', require('./router'))
app.use(require('./middleware/errorHandler'))

module.exports = app