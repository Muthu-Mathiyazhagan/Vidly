const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPassword } = require("joi-password");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {

  const accessToken = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      type: 'access'
    },
    process.env.vidly_jwtPrivateKey, { expiresIn: 3600 }
  );


  const refreshToken = jwt.sign(
    {
      _id: this._id,
      type: 'refresh'
    },
    process.env.vidly_jwtPrivateKey, { expiresIn: 86400 }
  );


  return [accessToken, refreshToken];
};

const User = mongoose.model("User", userSchema);

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required().email(),
  password: joiPassword
    .string()
    .min(5)
    .minOfSpecialCharacters(1)
    // .minOfLowercase(1)
    // .minOfUppercase(1)
    // .minOfNumeric(1)
    // .noWhiteSpaces()
    .required(),

  isAdmin: Joi.boolean(),
});

exports.schema = schema;
exports.User = User;
