"use strict"

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const api = require('./server/routes');
const mongoose = require('mongoose');
const errorhandler = require('./server/middlewares/errorHandler');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/fancyTodo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('connected to mongodb!');
})
.catch((err) => {
    console.log(err);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(errorhandler);

app.listen(process.env.PORT || PORT, () => console.log(`App listening on port ${PORT}!`));