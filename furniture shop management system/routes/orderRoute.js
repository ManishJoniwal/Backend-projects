const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  deleteOrder,
  getOrderById,
  updateOrder
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");
router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
