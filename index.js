const express = require("express");
const app = express();
require("dotenv").config();



console.log("process.env.vidly_jwtPrivateKey : ", process.env.vidly_jwtPrivateKey);


require('./startup/routes')(app);
require('./startup/dbConnect')();
require('./startup/logging')();
require('./startup/config')();

const port = process.env.VIDLY_PORT || 3000; //Get the PORT value from env file
app.listen(port, () => console.log(`Listening  On http://localhost:${port}`));