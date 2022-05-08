const { schema, Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());

// Create
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const movie = await new Movie({
    name: req.body.name,
  }).save();

  res.status(200).send(movie);
});

//   Read All
router.get("/", async (req, res) => {
  res.send(await Movie.find().sort("name").select({ __v: false }));
});

//Read Particular

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  console.log("movie: " + movie);

  if (!movie)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.send(movie);
});

//Update

router.put("/:id", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: 1 }
  );

  if (!movie)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.status(202).send(movie);
});

// Delete
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  // const movie = movies.find((c) => c.id == req.params.id);

  if (!movie)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res
    .status(200)
    .send(
      `The given id(${req.params.id}) has deleted Successfully \n movie : ${movie}`
    );
});

module.exports = router;
