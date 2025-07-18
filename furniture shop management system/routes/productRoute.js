const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Create
router.post("/", authMiddleware, upload.single("images"), addProduct);

// Read
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Update
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);

// Delete
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
