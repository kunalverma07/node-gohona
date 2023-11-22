// controllers/productController.js
const Product = require("../models/product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not create product",
      message: error.message,
    });
  }
};

// Read all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("image");
    res.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not fetch products",
      message: error.message,
    });
  }
};

// Read a single product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, error: "Product not found" });
    } else {
      res.json({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not fetch product",
      message: error.message,
    });
  }
};

// get products by category
exports.getProductByCategory = async (req, res) => {
  const category = req.body.category;

  console.log(req.body);
  try {
    const product = await Product.find({ category });
    if (!product) {
      res.status(404).json({ success: false, error: "Product not found" });
    } else {
      res.json({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not fetch product",
      message: error.message,
    });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update product",
      message: error.message,
    });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not delete product",
      message: error.message,
    });
  }
};
