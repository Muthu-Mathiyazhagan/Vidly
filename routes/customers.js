const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { schema, Customer } = require("../models/customer");

router.use(express.json());

// Create
router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  res.status(200).send(
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
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.send(customer);
});

//Update

router.put("/:id", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

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
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  // const genre = genres.find((c) => c.id == req.params.id);

  if (!customer)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res
    .status(200)
    .send(
      `The given id(${req.params.id}) has deleted Successfully \n genre : ${customer}`
    );
});

module.exports = router;
