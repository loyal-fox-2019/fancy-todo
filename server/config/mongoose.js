const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

console.log(MONGO_URI + "/" + MONGO_DB);

mongoose.connect(MONGO_URI + "/" + MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
}, (err) => {
    if (err) {
        console.log("mongodb failed to connect");
    } else {
        console.log("mongodb successfully connect");
    }
});

module.exports = mongoose;