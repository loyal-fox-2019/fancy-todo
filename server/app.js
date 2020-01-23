if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const routers = require('./routers');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://dbHarfi:${process.env.MONGO_ATLAS}@hacktiv-ra2tp.mongodb.net/hacktiv?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use("/", routers);

app.listen(port, () =>
    console.log(`Fancy Todo App listening on port ${port}!`)
);