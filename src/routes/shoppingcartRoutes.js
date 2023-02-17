const express = require("express");
const router = express.Router();
const {
  createShoppingCart,
  getShoppingCartById,
  addItemToShoppingCart,
  deleteItemFromShoppingCart,
  deleteShoppingCart,
} = require("../controllers/shoppingcartController");

router.post("/", createShoppingCart);

router.get("/:cartId", getShoppingCartById);

router.post("/:cartId/items", addItemToShoppingCart);

router.put("/:cartId/items/:productId", deleteItemFromShoppingCart);

router.delete("/:cartId", deleteShoppingCart);

module.exports = router;
