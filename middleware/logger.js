function log(req, res, next) {
  console.log("From Custom Middleware Logger function Req Url: ", req.url);
  next();
}

module.exports = log;
