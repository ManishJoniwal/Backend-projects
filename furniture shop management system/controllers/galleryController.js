const Gallery = require("../models/galleryModel");

exports.addGalleryImage = async (req, res) => {
  try {
    const { category, altText } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const newImage = new Gallery({
      image: req.file.path,
      category,
      altText,
    });

    await newImage.save();

    res.status(201).json({
      message: "Image added to gallery successfully",
      data: newImage,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add image to gallery",
      error: err.message,
    });
  }
};

exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const imageDoc = await Gallery.findById(id);

    if (!imageDoc) {
      return res.status(404).json({ message: "Image not found" });
    }
    if (imageDoc.imagePublicId) {
      await cloudinary.uploader.destroy(imageDoc.imagePublicId);
    }
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: "Gallery image deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete gallery image",
      error: err.message,
    });
  }
};
