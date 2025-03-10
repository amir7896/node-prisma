const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/create", authenticate, createProduct);
router.get("/list", authenticate, getAllProducts);
router.get("/:id", authenticate, getSingleProduct);
router.put("/update/:id", authenticate, updateProduct);
router.delete("/delete/:id", authenticate, deleteProduct);

module.exports = router;
