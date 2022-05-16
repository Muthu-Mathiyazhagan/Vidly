const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { schema, User } = require("../models/user");
const admin = require("../middleware/admin");

router.use(express.json());

//Get Current User
router.get("/me", auth, async (req, res) => {
  console.log("User", req.user);
  let user = await User.findOne({ _id: req.user.id }).select("-password");
  console.log("user", user);
  if (!user) {
    return res.status(404).send(`user not found`);
  }
  return res.status(200).send(user);
});

//Send All Users
router.get("/", async (req, res) => {
  let user = await User.find().select("-password");
  console.log("user", user.length);
  if (!user) {
    return res.status(404).send(`no user found`);
  }
  return res.status(200).send(user);
});

//Create a new user
router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send(`User Already Registered.! "${user.email}"`);

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
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
