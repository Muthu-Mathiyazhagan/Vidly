const auth = require("../middleware/auth");
const { schema, Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());

// Create
router.post("/", auth, async (req, res) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await new Genre({
    name: req.body.name,
  }).save();

  res.status(200).send(genre);
});

//   Read All
router.get("/", async (req, res) => {
  res.send(await Genre.find().sort("name").select({ __v: false }));
});

//Read Particular

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send(
        `"genreId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const genre = await Genre.findById(req.params.id);

  console.log("genre: " + genre);

  if (!genre)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.send(genre);
});

//Update

router.put("/:id",auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send(
        `"genreId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: 1 }
  );

  if (!genre)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.status(202).send(genre);
});

// Delete
router.delete("/:id",auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send(
        `"genreId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const genre = await Genre.findByIdAndRemove(req.params.id);

  // const genre = genres.find((c) => c.id == req.params.id);

  if (!genre)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res
    .status(200)
    .send(
      `The given id(${req.params.id}) has deleted Successfully \n genre : ${genre}`
    );
});

module.exports = router;
