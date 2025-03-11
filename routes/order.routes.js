const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getUserOrders,
  getTotalSales,
  getTopSellingProducts,
} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/create", authenticate, createOrder);
router.get("/:id", authenticate, getOrderById);
router.get("/user/user-order", authenticate, getUserOrders);
router.get("/sales/total-sales", authenticate, getTotalSales);
router.get("/sales/top-selling", authenticate, getTopSellingProducts);

module.exports = router;
