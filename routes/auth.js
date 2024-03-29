const _ = require('lodash')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { User } = require('../models/user')

router.use(express.json())

//Sign In user
router.post('/', signInUserPostApi)

async function signInUserPostApi (req, res) {
  console.log(__filename, 'Called')
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send(`Invalid email or password`)

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send(`Invalid email or password`)

  const token = user.generateAuthToken()

  // const token = jwt.sign(
  //   {
  //     _id: user._id,
  //   },
  //   config.get("jwtPrivateKey")
  // );

  return res
    .header('x-auth-access-token', token[0])
    .header('x-auth-refresh-token', token[1])
    .status(200)
    .send(_.pick(user, ['-_id', 'name', 'email']))
}
var schema = Joi.object({
  email: Joi.string()
    .min(3)
    .required()
    .email(),
  password: Joi.string()
    .min(3)
    .required()
})

module.exports = router
module.exports.signInUserPostApi = signInUserPostApi;
