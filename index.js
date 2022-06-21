require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const config = require("config");
require("dotenv").config();

const express = require("express");
const app = express();

require('./startup/routes')(app);
require('./startup/dbConnect')();

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, {
  db: process.env.dbUri,
  level: 'info'
});

process.on('uncaughtException', (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(ex.message, ex);
});


process.on('unhandledRejection', (ex) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  winston.error(ex.message, ex);
});




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

async function DeleteAll(CollectionName) {
  // Deleting all data
  CollectionName.deleteMany({})
    .then(() => {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
}
