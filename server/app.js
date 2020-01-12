'use strict';
if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const user = require('./routes/user');
const todo = require('./routes/todo');

app.use(cors());
mongoose.connect('mongodb://localhost:27017/fancy_todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(response => {
    console.log(`Connected to MongoDB`);
})
.catch(error => {
    console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', user);
app.use('/todo', todo);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
