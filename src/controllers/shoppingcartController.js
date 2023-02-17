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
  const quantity = req.body.quantity;

  if (!cartId && !productId && !quantity) {
    throw new BadRequestError("You must provide both a cartId and productId");
  }

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("Product does not exists");

  const cart = await ShoppingCart.findById(cartId);
  if (!cart) throw new NotFoundError("That cart does not exist");

  const productToCart = {
    productId: productId,
    productName: product.productName,
    quantity: quantity,
    price: product.productPrice * quantity,
  };

  const foundProduct = cart.items.find((prod) => prod.productId == productId);

  if (cart.items.length >= 1) {
    if (foundProduct) {
      foundProduct.quantity += quantity;
      foundProduct.price += product.productPrice * quantity;
    } else {
      cart.items.push(productToCart);
    }
  } else {
    cart.items.push(productToCart);
  }

  cart.totalPrice += product.productPrice * quantity;

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
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  let cart = await ShoppingCart.findById(cartId);
  if (!cart) throw new NotFoundError("That cart does not exist");

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("Product does not exists");

  const items = cart.items;

  const foundProduct = items.find((prod) => prod.productId == productId);
  // if (!foundProduct) throw new NotFoundError("This product does not exist");

  const productPriceToRemove = product.productPrice;

  if (foundProduct) {
    if (foundProduct.quantity > quantity) {
      foundProduct.quantity -= quantity;
      foundProduct.price -= productPriceToRemove;
    } else {
      items.splice(foundProduct, 1);
    }
  } else {
    throw new NotFoundError("This product does not exist in cart");
  }

  cart.totalPrice -= productPriceToRemove * quantity;

  const newCart = await cart.save();

  return res.status(200).json(newCart);
};

exports.deleteShoppingCart = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cartToDelete = await ShoppingCart.findById(cartId);
  if (!cartToDelete) throw new NotFoundError("That cart does not exist");

  await cartToDelete.delete();

  return res.status(204).send("Shoppingcart is deleted.");
};
