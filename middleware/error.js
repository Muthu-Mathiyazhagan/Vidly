module.exports = function (error, req, res, next) {
  res.status(504).send("Something went wrong !");
};
