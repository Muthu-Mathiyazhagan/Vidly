const jwt = require("jsonwebtoken");
const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { schema, User } = require("../models/user");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const { result } = require("lodash");
const sendEmail = require("../utils/email");
const message = require('../roughNote');
console.log(message);

require("dotenv").config();

router.use(express.json());

//Get Current User
router.get(
  "/me",
  auth,
  async (req, res) => {
    console.log("User", req.user);
    let user = await User.findById(req.user._id).select("name email -_id");
    console.log("user", user);
    try {
      await sendEmail("muthu@divum.in", "Verify Email", message);

    } catch (error) {
      console.error(error)

    }


    if (!user) {
      return res.status(404).send(`user not found`);
    }
    return res.status(200).send(user);
  }
);

//Send All Users
router.get("/", auth, async (req, res) => {
  let user = await User.find().select("name email _id");
  console.log("user", user.length);
  if (!user) {
    return res.status(404).send(`no user found`);
  }
  return res.status(200).send(user);
});

//Generate Auth Tokens with userId without Refresh Token
router.get("/create-user-token-by-id", async (req, res) => {

  // Need to implement below algo
  // 1. Need to verify the Refresh Token
  // 2. If Refresh Token Valid send new Tokens
  // 3. If Refresh Token invalid ask user to login again

  console.log("Create User Token Called ");
  console.log('userId : ', req.header("User-Id"));


  if (!mongoose.Types.ObjectId.isValid(req.header("User-Id")))
    return res
      .status(404)
      .send(
        `"genreId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );


  let user = await User.findById(req.header("User-Id"));
  if (!user) {
    return res.status(400).send(`User not Registered.!`);
  } console.log("generate auth token Called");

  const token = await user.generateAuthToken();
  console.log("Token : ", token);

  return res
    .header("x-auth-access-token", token[0])
    .header("x-auth-refresh-token", token[1])
    .status(200)
    .send(_.pick(user, ["_id", "name", "email"]));



})


//Generate Auth Tokens with Refresh Token without User Id
router.get("/create-user-token-by-refresh-token", async (req, res) => {

  // Need to implement below algo
  // 1. Need to verify the Refresh Token
  // 2. If Refresh Token Valid send new Tokens
  // 3. If Refresh Token invalid ask user to login again

  console.log("Create User Token Called Using Refresh Token ");
  let refreshToken = req.header(`x-auth-refresh-token`);
  console.log('refresh Token : ', refreshToken);

  if (!refreshToken) return res.status(401).send(`Access denied. No Token Provided`);
  try {
    var user = jwt.verify(refreshToken, process.env.vidly_jwtPrivateKey);
    console.log('user Id ', user._id);
    console.log('user type :  ', user.type);

    if (user.type !== 'refresh') {
      console.log("This is Not Refresh Token");
      return res.status(403).send(`Please provide "Refresh" Token: Your Token type is : ${user.type}`);

    }
  } catch (error) {
    if (error.message == "jwt expired") {
      var send = 'Please Re-Login : Your Tokens are Expired.';
    }
    return res.status(400).send(`${error.message}. \n ${send}`);
  }



  user = await User.findById(user._id);

  if (!user) {
    return res.status(400).send(`User not Registered.!`);
  }

  const token = await user.generateAuthToken();
  console.log("Token : ", token);

  return res
    .header("x-auth-access-token", token[0])
    .header("x-auth-refresh-token", token[1])
    .status(200)
    .send(_.pick(user, ["_id", "name", "email"]));


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

  const token = await user.generateAuthToken();
  console.log("Token : ".token);

  return res
    .header("x-auth-access-token", token[0])
    .header("x-auth-refresh-token", token[1])
    .status(200)
    .send(_.pick(user, ["_id", "name", "email"]));
});


// Delete a user
router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send(
        `"genreId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const user = await User.findByIdAndRemove(req.params.id);

  // const movie = movies.find((c) => c.id == req.params.id);

  if (!user)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res
    .status(200)
    .send(
      `The User Name : (${user.name}) has deleted Successfully \n user : ${user}`
    );
});




module.exports = router;
