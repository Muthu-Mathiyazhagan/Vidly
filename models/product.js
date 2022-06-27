const mongoose = require("mongoose");
const Joi = require("joi");


const Product = mongoose.model("Product", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    productImage: { type: String }

}));

const schema = Joi.object({
    name: Joi.string().min(3).required(),
});

exports.schema = schema;
exports.Product = Product;
