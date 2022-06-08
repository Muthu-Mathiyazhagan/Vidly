const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const config = require("config");
require("dotenv").config();
const DbStatus = ["Disconnected", "Connected", "connecting", "disconnecting"];

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

if (!process.env.vidly_jwtPrivateKey) {
  console.error(
    "FATAL ERROR: JWT private key not defined in environment variable of the Machine"
  );
  process.exit(1);
}

console.log(process.env.vidly_jwtPrivateKey);
console.log(config.get("VIDLY_PORT"));

mongoose
  .connect("mongodb://localhost/vidly")
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
const port = config.get('VIDLY_PORT') || 3000; //Get the PORT value from env file
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
