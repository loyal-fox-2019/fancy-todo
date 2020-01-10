if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errHandler = require('./middlewares/errHandler');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database ${MONGO_URI}`))
  .catch((err) => console.log(`Database connection fail, err: ${err}`));

const routing = require('./routes');
app.use('/', routing);
app.use(errHandler); //bottomware
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));