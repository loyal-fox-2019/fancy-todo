const mongoose = require('mongoose')
let db = process.env.MONGO_ATLAS
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  db = process.env.URL_DB + process.env.NODE_ENV
  }

mongoose.connect(
  db,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) console.log('Failed connect to database')
    else console.log('Success connect to database')
  }
)

module.exports = mongoose
