require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
require("dotenv").config();
const DbStatus = ["Disconnected", "Connected", "connecting", "disconnecting"];


const app = express();

require('./startup/routes')(app);

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




// throw new Error('Something Failed');


if (!process.env.vidly_jwtPrivateKey) {
  console.error(
    "FATAL ERROR: JWT private key not defined in environment variable of the Machine"
  );
  process.exit(1);
}

console.log(process.env.vidly_jwtPrivateKey);
console.log(process.env.VIDLY_PORT);

mongoose
  .connect(process.env.dbUri)
  .then(() => {
    console.log(
      "Mongo DB Conection Status : ",
      DbStatus[mongoose.connection.readyState]
    );
  })
  .catch(() => {
    console.log(
      "Mongo DB Conection Status : ",
      DbStatus[mongoose.connection.readyState]
    );
  });
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
