const logger = require("./middleware/logger");
const morgan = require("morgan");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(logger);
app.use("/api/genres", genres);

app.listen(3000, () => console.log("Listening to the Port 3000"));
