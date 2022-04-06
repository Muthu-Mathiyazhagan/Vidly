const express = require("express");
const logger = require("./logger");
const morgan = require("morgan");

const Joi = require("joi");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(logger);

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Thriller" },
  { id: 3, name: "Romance" },
];

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});
// const { error } = schema.validate({ name: "22" })

// console.log(error.details[0].message);
// Create
app.post("/api/genres", (req, res) => {
  console.log(req.body.name);
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.status(200).send(genre);
});

//   Read All
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//Read Particular

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id == req.params.id);

  //The Below commented Codes is doing exactly what a previous single line Code DOs
  //   const genre = genres.find((c) => {
  //     if (c.id == req.params.id) {
  //       console.log("C .id : ", c.id);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  //   );

  if (!genre)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.send(genre);
});

//Update

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id == req.params.id);

  if (!genre)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name;
  res.status(202).send(genre);
});

// Delete
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id == req.params.id);

  if (!genre)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res
    .status(200)
    .send(`The given id(${req.params.id}) has deleted Successfully`);
});

app.listen(3000, () => console.log("Listening to the Port 3000"));
