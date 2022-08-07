const { schema, Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const { Customer } = require("../models/customer");
const express = require("express");
const router = express.Router();
// const Fawn = require("fawn");
const mongoose = require("mongoose");
const admin = require("../middleware/admin");
router.use(express.json());

// Fawn.init(mongoose);

// CRUD Operations below

//   Read All
router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut").select({ __v: false }));
});

// Create
router.post("/",auth, async (req, res) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send(`Invalid customer`);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send(` Invalid Movie`);

  if (movie.numberInStock == 0)
    return res.status(404).send(`Movie not in stock`);

  const rental = await new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  rental.save();
  movie.numberInStock--;
  movie.save();

  // handling Transaction with Fawn // But Failed

  //   try {
  //     new Fawn.Task()
  //       .save("rentals", rental)
  //       .update(
  //         "movies",
  //         { _id: movie._id },
  //         {
  //           $inc: { numberInStock: -1 },
  //         }
  //       )
  //       .run();
  //   } catch (error) {
  //     res.status(500).send("Something went wrong");
  //   }

  res.status(200).send(rental);
});

//Read Particular
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(
        `"rentalId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const rental = await Rental.findById(req.params.id);

  console.log("Rental: " + rental);

  if (!rental)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res.send(rental);
});

// Delete
router.delete("/:id",auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(
        `"rentalId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  const rental = await Rental.findByIdAndRemove(req.params.id);

  // const movie = movies.find((c) => c.id == req.params.id);

  if (!rental)
    return res
      .status(404)
      .send(`The Given Id (${req.params.id}) was not Found.!`);

  res
    .status(202)
    .send(
      `The Rental id : (${rental._id}) has deleted Successfully \n Deleted Rental : ${rental}`
    );
});

//Update

router.put("/:id",[auth,admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(
        `"rentalId" with value "${req.params.id}" fails to match the valid mongo id pattern`
      );
  return res
    .status(405)
    .send(
      "hahaha .!. \n We are not supporting Update Rental Data from Outside. Update API for rentals dont make sense now 09 May 2022 ; "
    );

  console.log("Req", req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send(`Invalid customer`);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send(` Invalid Movie`);

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        name: movie.name,
        dailyRentalRate: movie.dailyRentalRate,
      },
    },
    { new: 1 }
  );

  res.status(202).send(rental);
});

module.exports = router;
