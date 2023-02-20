const Product = require("../models/Product");
const { NotFoundError } = require("../utils/errors");

exports.getAllProducts = async (req, res) => {
  const limit = Number(req.query?.limit) || 10;
  const offset = Number(req.query?.offset) || 0;

  const products = await Product.find()
    .sort({ createdAt: "desc" })
    .skip(offset)
    .limit(limit);

  const totalProducts = await Product.countDocuments();

  return res.json({
    products: products,
    meta: {
      total: totalProducts,
      limit: limit,
      offset: offset,
      count: products.length,
    },
  });
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("That product does not exist...");

  return res.status(200).json(product);
};
