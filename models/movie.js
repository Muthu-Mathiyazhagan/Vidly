const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
  })
);

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  //   genre: Joi.boolean(),

  numberInStock: Joi.number().required().min(0).max(500),
  dailyRentalRate: Joi.number().required().min(0).max(500),
});

exports.schema = schema;
exports.Movie = Movie;
