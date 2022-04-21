const mongoose = require("mongoose");
const Joi = require("joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
  })
);

const schema = Joi.object({
  name: Joi.string().min(3).required().trim(),
});

exports.schema = schema;
exports.Genre = Genre;
