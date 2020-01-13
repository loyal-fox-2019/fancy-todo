if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

require('./config/mongodb')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes'))
app.use(require('./middlewares/error-handler'))

module.exports = app
