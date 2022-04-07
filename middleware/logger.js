function log(req, res, next) {
  console.log("From Custom Middleware Logger function Req Url: ", req.url);
  // res.send("test").status(200);
  next();
}
module.exports = log;
