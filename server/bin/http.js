'use strict'

const app = require('../app.js')
const port = process.env.PORT || 3000;

require('http').createServer(app).listen(port);

console.log(`Server listening to port ${port}`);
