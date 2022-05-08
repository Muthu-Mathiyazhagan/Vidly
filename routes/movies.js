const { schema, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());

// Create
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if (!genre)
    return res
      .status(404)
      .send(
        `The Given GenreID  (${req.body.genreId}) was not Found.! || Invalid Genre`
      );

  const movie = await new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
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
  console.log("Req", req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if (!genre)
    return res
      .status(404)
      .send(
        `The Given GenreID  (${req.body.genreId}) was not Found.! || Invalid Genre`
      );

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
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
      `The Movie title : (${movie.title}) has deleted Successfully \n movie : ${movie}`
    );
});

module.exports = router;
