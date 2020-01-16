require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

const routes = require("./routes");
app.use('/',routes);

app.listen(port,() => console.log(`App listening on port ${port}!`));