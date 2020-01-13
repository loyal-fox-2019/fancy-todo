if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const morgan = require('morgan')
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)
app.use((req, res, next) => {
    const err = {
        msg: 'Not Found',
        status: 404
    }
    next(err)
})

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on PORT ${port}`))