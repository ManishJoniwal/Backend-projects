const Order = require("../models/orderModel");
const sendMail = require("../utils/sendMail");

exports.createOrder = async (req, res) => {
  try {
    const { email, replyMessage } = req.body;

    const newOrder = new Order(req.body);
    await newOrder.save();

    // Send reply message to customer email
    if (email && replyMessage) {
      const sent = await sendMail(
        email,
        "Your Custom Furniture Order Response",
        replyMessage
      );

      if (!sent) {
        return res.status(500).json({
          message: "Order saved but failed to send reply email.",
          newOrder,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Order created and reply email sent.",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Optional: admin use
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};
