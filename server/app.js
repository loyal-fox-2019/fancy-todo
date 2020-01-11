if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true,});

const PORT = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/ErrorHandler')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/',router)
app.use(errorHandler)
app.listen(PORT, () => console.log('app listened in port: ' + PORT))
