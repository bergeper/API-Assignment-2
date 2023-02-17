const express = require("express");
const router = express.Router();
const {
  createShoppingCart,
  getShoppingCartById,
  addItemToShoppingCart,
  deleteItemFromShoppingCart,
  deleteShoppingCart,
} = require("../controllers/shoppingcartController");

// /api/v1/shoppingcarts/
router.post("/", createShoppingCart);

// /api/v1/shoppingcarts/:cartId
router.get("/:cartId", getShoppingCartById);

// /api/v1/shoppingcarts/:cartId/items
router.post("/:cartId/items", addItemToShoppingCart);

// /api/v1/shoppingcarts/:cartId/items/
router.put("/:cartId/items", deleteItemFromShoppingCart);

// /api/v1/shoppingcarts/:cartId
router.delete("/:cartId", deleteShoppingCart);

module.exports = router;
