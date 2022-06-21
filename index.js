const express = require("express");
const app = express();
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/dbConnect')();
require('./startup/logging')();
require('./startup/config')();

const port = process.env.VIDLY_PORT || 3000; //Get the PORT value from env file
app.listen(port, () => winston.info(`Listening  On http://localhost:${port}`));