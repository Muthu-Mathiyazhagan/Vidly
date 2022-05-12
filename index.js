const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const logger = require("./middleware/logger");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(logger);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

mongoose.connect("mongodb://localhost/vidly").then(() => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT || 3000;
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
