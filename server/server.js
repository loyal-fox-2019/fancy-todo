require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { handleError, ErrorHandler } = require('./helpers');
const { todoRouter, userRouter } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// db config
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// path to many routes
app.use('/todos', todoRouter);
app.use('/users', userRouter);

// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
  console.log(err);
});

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
