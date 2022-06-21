require('express-async-errors');

const config = require("config");
require("dotenv").config();

const express = require("express");
const app = express();

require('./startup/routes')(app);
require('./startup/dbConnect')();
require('./startup/logging')();


if (!process.env.vidly_jwtPrivateKey) {
  console.error(
    "FATAL ERROR: JWT private key not defined in environment variable of the Machine"
  );
  process.exit(1);
}

console.log(process.env.vidly_jwtPrivateKey);
console.log(process.env.VIDLY_PORT);


const port = process.env.VIDLY_PORT || 3000; //Get the PORT value from env file
app.listen(port, () => console.log(`Listening  On http://localhost:${port}`));