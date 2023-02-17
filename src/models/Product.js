const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
