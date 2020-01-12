if (process.env.DEBUG !== undefined) {
    console.log("Development");
    require('dotenv');
}

var createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const mongoose = require('mongoose');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todoRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost:27017/fancy_todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.")
})
.catch(err => {
    console.error("Connection error", err)
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/todo", todoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("404");
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;