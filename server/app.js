'use strict';

if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
require('./mongoose');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', routes);

app.listen(PORT, function() {
    console.log('Server Todo listening to port ' +PORT);
});