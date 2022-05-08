const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const logger = require("./middleware/logger");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(logger);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

mongoose.connect("mongodb://localhost/vidly").then(() => {
  console.log("Connected to MongoDB");
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening  On http://localhost:${port}`));

