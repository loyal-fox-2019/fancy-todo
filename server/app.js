require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect('mongodb://localhost:27017/local-todo-dev00', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.listen(port, () => console.log(`listening on port ${port}`))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', routes)
app.use(errorHandler)