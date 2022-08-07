module.exports = function (err, req, res, next) {
  //Log the Error
  console.log('verbose', err.message, err)
  res.status(500).send(`Something went wrong! : \n ${err}`)
}
