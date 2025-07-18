const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: true,
    },
    dimension: {
      type: String,
      required: true,
    },
    materialAndFinish: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    category: {
      type: [String],
      required: true,
    },
    bestSeller: { type: Boolean, default: false },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
