const express = require("express");
const { getProfile } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authenticate, getProfile);

module.exports = router;
