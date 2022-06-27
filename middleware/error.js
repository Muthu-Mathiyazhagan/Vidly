const winston = require("winston");

module.exports = function (err, req, res, next) {
  //Log the Error
  winston.log('verbose',err.message,err)
  res.status(500).send(`Something went wrong! : \n ${err}`);
};