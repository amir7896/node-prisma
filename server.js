require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tokenCron = require("./cron/tokenCron");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Start Cron Job
tokenCron.start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
