const jwt = require("jsonwebtoken");
// const config = require("config");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send(`Access denied. No Token Provided`);
  try {
    req.user = jwt.verify(token, process.env.vidly_jwtPrivateKey);
    if (req.user.type == 'access') {
      next();
    } else {
      return res.status(403).send(`Please provide "Access" Token: Your Token type is : ${req.user.type}`);
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      var send = 'Please call "createUserToken" api to generate new Tokens';

    }
    return res.status(400).send(`${error.message}. \n ${send}`);

  }
};
