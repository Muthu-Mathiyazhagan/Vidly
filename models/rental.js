const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          trim: true,
          minlength: 3,
          maxlength: 255,
          required: true,
        },
        dailyRentalRate: {
          type: Number,
          min: 0,
          max: 255,
          required: true,
        },
        dateOut: {
          type: Date,
          required: true,
          default: Date,
        },
        dateReturned: {
          type: Date,
        },
        rentalFee: {
          type: Number,
          min: 0,
        },
      }),
      required: true,
    },
  })
);

const schema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
});

exports.schema = schema;
exports.Rental = Rental;
