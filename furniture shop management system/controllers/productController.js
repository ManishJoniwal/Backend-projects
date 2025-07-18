const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

// Add Product Controller
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      dimension,
      materialAndFinish,
      features,
      category,
      bestSeller,
    } = req.body;

    const image = req.file?.path; // Cloudinary URL
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = new Product({
      name,
      description,
      dimension,
      materialAndFinish,
      features,
      category,
      bestSeller,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res
      .status(500)
      .json({ message: "Failed to create product", error: err.message });
  }
};

// 🔹 View All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: "Products fetched successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// 🔹 Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Products fetched successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting product", error: error.message });
  }
};

// 🔹 Update Product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      name,
      description,
      dimension,
      materialAndFinish,
      features,
      category,
      bestSeller,
    } = req.body;

    const updateFields = {
      name,
      description,
      dimension,
      materialAndFinish,
      features: features ? features.split(",") : [], // if features is comma-separated
      category: category ? category.split(",") : [], // if multiple categories
      bestSeller,
    };

    if (req.file && req.file.path) {
      updateFields.image = req.file.path; // Cloudinary image URL
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete product",
      error: err.message,
    });
  }
};
