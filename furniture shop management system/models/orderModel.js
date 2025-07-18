const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Customer Info
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    // Furniture Info
    furnitureType: {
      type: String,
      required: true,
    },
    intendedUse: {
      type: String,
      required: true,
    },
    stylePreference: {
      type: String,
    },

    // Dimensions
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },

    // Material
    primaryMaterial: { type: String },
    finishType: { type: String },

    // Other Info
    timelineAndDelivery: { type: String },
    budget: { type: String },
    message: { type: String },

    // Reply Info (form ke part me hi)
    replyMessage: { type: String },
    replyMail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
