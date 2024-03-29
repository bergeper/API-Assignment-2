require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../src/models/Product");
const { mockProductData } = require("./products");

const populateDbWithMockProducts = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Product.deleteMany();

    const productRes = await Product.create(mockProductData);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockProducts(process.env.CONNECTION_STRING);
