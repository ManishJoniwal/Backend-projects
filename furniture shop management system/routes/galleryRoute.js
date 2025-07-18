const express = require("express");
const router = express.Router();
const {
  addGalleryImage,
  deleteGalleryImage,
} = require("../controllers/galleryController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Add image
router.post("/", upload.single("image"), addGalleryImage);

// Delete image
router.delete("/:id", protect, deleteGalleryImage);

module.exports = router;
