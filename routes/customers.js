const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");
const { schema, Customer } = require("../models/customer");

router.use(express.json());

// Create
router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ phone: req.body.phone });
  if (customer)
    return res
      .status(409)
      .send(`User Already Registered.! "${customer.phone}"`);

  res.status(201).send(
    await new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    }).save()
  );
});

//   Read All
router.get("/", async (req, res) => {
  res.send(await Customer.find().sort("name").select({ __v: false }));
});

//Read Particular

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(
        `"customerId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.send(customer);
});

//Update

router.put("/:id", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Below logic does not work . May be need to handle this error in Express.Router Level; (I Guess :)  ;
  // if (req.params.id == "") {
  //   return res.status(400).send(`Customer id in URL is required`);
  // }

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(
        `"customerId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: 1 }
  );

  if (!customer)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.status(202).send(customer);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(
        `"customerId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const customer = await Customer.findByIdAndRemove(req.params.id);

  // const genre = genres.find((c) => c.id == req.params.id);

  if (!customer)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res
    .status(202)
    .send(
      `The given id(${req.params.id}) has deleted Successfully \n genre : ${customer}`
    );
});

module.exports = router;
