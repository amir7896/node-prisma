const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/create", authenticate, createProduct);
router.get("/list", authenticate, getAllProducts);
router.get("/:id", authenticate, getSingleProduct);

module.exports = router;
