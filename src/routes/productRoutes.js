const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// /api/v1/products/?limit=5&offset=1 or your choosing
router.get("/", getAllProducts);

// /api/v1/products/:productId
router.get("/:productId", getProductById);

module.exports = router;
