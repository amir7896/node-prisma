const express = require("express");
const { getProfile } = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authenticate, getProfile);

module.exports = router;
