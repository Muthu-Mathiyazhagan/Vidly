const logger = require("./middleware/logger");
const morgan = require("morgan");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
const mongoose = require("mongoose");

app.use(logger);
app.use("/api/genres", genres);
app.use("/api/customers", customers);

mongoose.connect("mongodb://localhost/vidly").then(() => {
  console.log("Connected to MongoDB");
});

app.listen(3000, () => console.log("Listening to the Port 3000"));
