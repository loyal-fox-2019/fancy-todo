'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

const TodoRouter = require('./router/todo');
const UserRouter = require('./router/user');
const ErrorHandler = require('./middlewares/errorHandle');

mongoose
	.connect('mongodb://localhost:27017/fancy-todo', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() => {
		console.log('masuk pak eko');
	})
	.catch(() => {
		console.log('error pak eko');
	});

app.use('/', UserRouter);
app.use('/todo', TodoRouter);

app.use(ErrorHandler);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
