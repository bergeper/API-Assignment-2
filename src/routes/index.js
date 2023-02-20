const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const shoppingcartRoutes = require("./shoppingcartRoutes");

router.use("/products", productRoutes);
router.use("/shoppingcarts", shoppingcartRoutes);

module.exports = router;
