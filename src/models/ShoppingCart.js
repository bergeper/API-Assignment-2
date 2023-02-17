const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
    _id: false,
  },
  {
    timestamps: true,
  }
);

const ShoppingCartSchema = new mongoose.Schema(
  {
    items: [ItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
