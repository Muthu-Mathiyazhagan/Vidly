const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { schema, User } = require("../models/user");

router.use(express.json());

//Create a new user
router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  console.log("user: " + user);
  if (user)
    return res.status(400).send(`User Already Registered.! "${user.email}"`);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
 
  res.status(200).send(user);
});

module.exports = router;
