require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.models.js");

const app = express();


app.use(express.json());

// const bodyParser =  require('body-parser');
// const fs =          require('fs');

// app.use(bodyParser.json());

mongoose
  .connect(
    process.env.MONGO_DB_URI 
  )
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// create a new product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
    //  const { name, price } = req.body;
    //  const product = new Product({ name, price });
    //     await product.save();
    //     res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    if (error.code === 11000) {
      res.status(400).json({ message: "Product name must be unique" });
    }
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
app.get("/api/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    // const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //   const {name, price, quantity, image} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // const newUpdatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product by ID

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Could not find product" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
