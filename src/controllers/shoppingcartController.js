const ShoppingCart = require("../models/ShoppingCart");
const Product = require("../models/Product");
const { BadRequestError, NotFoundError } = require("../utils/errors");

exports.createShoppingCart = async (req, res, next) => {
  const newShoppingCart = await ShoppingCart.create({});

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/shoppingcarts/${newShoppingCart._id}`
    )
    .status(201)
    .json(newShoppingCart);
};

exports.getShoppingCartById = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cart = await ShoppingCart.findById(cartId);
  if (!cart) throw new NotFoundError("That cart does not exist...");

  return res.status(200).json(cart);
};

exports.addItemToShoppingCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const productId = req.body.productId;

  let quantityToAdd = req.body.quantity;

  if (quantityToAdd == null) {
    quantityToAdd = 1;
  }

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("Product does not exists");

  const cart = await ShoppingCart.findById(cartId);
  if (!cart) throw new NotFoundError("That cart does not exist");

  const productToCart = {
    productId: productId,
    productName: product.productName,
    quantity: quantityToAdd,
    unitPrice: product.productPrice,
    price: product.productPrice * quantityToAdd,
  };

  const foundProduct = cart.items.find((prod) => prod.productId == productId);

  if (cart.items.length >= 1) {
    if (foundProduct) {
      foundProduct.quantity += quantityToAdd;
      foundProduct.price += product.productPrice * quantityToAdd;
    } else {
      cart.items.push(productToCart);
    }
  } else {
    cart.items.push(productToCart);
  }

  cart.totalPrice += product.productPrice * quantityToAdd;

  const updatedCart = await cart.save();

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/shoppingcarts/${updatedCart._id}`
    )
    .status(201)
    .json(updatedCart);
};

exports.deleteItemFromShoppingCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;

  let quantityToRemove = quantity;
  if (quantity == null) {
    quantityToRemove = 1;
  }

  let cart = await ShoppingCart.findById(cartId);
  if (!cart) throw new NotFoundError("That cart does not exist");

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("Product does not exists");

  const productPriceToRemove = product.productPrice;
  const items = cart.items;

  const foundProduct = items.findIndex((prod) => prod.productId == productId);

  if (items[foundProduct].quantity < quantityToRemove)
    throw new BadRequestError(
      "You can't remove a higher quantity then the item in cart has."
    );

  if (items[foundProduct].quantity > quantityToRemove) {
    items[foundProduct].quantity -= quantityToRemove;
    items[foundProduct].price -= productPriceToRemove * quantityToRemove;
  } else {
    items.splice(foundProduct, 1);
  }

  cart.totalPrice -= productPriceToRemove * quantityToRemove;

  if (cart.totalPrice < 0) {
    cart.totalPrice = 0;
  }

  const updatedCart = await cart.save();

  return res.status(202).json(updatedCart);
};

exports.deleteShoppingCart = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cartToDelete = await ShoppingCart.findById(cartId);
  if (!cartToDelete) throw new NotFoundError("That cart does not exist");

  await cartToDelete.delete();

  return res.status(204).send("Shoppingcart is deleted.");
};
