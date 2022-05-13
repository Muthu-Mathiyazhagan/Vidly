const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { schema, User } = require("../models/user");

router.use(express.json());

//Create a new user
router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send(`User Already Registered.! "${user.email}"`);

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(200)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
