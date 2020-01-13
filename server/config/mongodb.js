const mongoose = require('mongoose')
const mongodb_uri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/default'

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to db', mongodb_uri))
  .catch(() => console.log('failed to connect to db'))
