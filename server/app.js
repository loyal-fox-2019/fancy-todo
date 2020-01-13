if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

require('./config/mongoose.js')
const express = require('express'),
  app = express(),
  port = process.env.PORT 
  cors = require('cors')
  routes = require('./routes')
  errorHandler = require('./middlewares/errorHandler.js')
  path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('client'))
app.use('/', routes)
app.use(errorHandler)

app.listen(port, _=> console.log('Server running on port: ', port))