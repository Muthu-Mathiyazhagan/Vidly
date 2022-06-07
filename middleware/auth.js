const jwt = require("jsonwebtoken");
// const config = require("config");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send(`Access denied. No Token Provided`);
  try {
    req.user = jwt.verify(token, process.env.vidly_jwtPrivateKey);
    next();
  } catch (error) {
    return res.status(400).send(`Invalid token.`);
  }
};