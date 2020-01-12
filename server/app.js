const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const routes = require('./routes/index.js')
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config()

const mongoDB = 'mongodb://localhost:27017/fancy_todo';
mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/',routes)
app.use(errorHandler)

app.listen(PORT, ()=>console.log(`listening to port ${PORT}`))