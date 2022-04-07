const express = require("express");
const router = express.Router();

router.use(express.json());

const Joi = require("joi");

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Thriller" },
  { id: 3, name: "Romance" },
];

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

// Create
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
  res.send(genres);
});

//Read Particular

router.get("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
