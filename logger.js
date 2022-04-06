function log(req, res, next) {
  console.log("Req Url: ", req.url);
  next();
}

module.exports = log;
