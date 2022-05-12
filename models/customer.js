const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    isGold: Boolean,
    phone: {
      type: String,
      minlength: 3,
    },
  })
);

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  isGold: Joi.boolean(),
  phone: Joi.string().required(),
});

exports.schema = schema;
exports.Customer = Customer;
