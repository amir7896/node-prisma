require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const tokenCron = require("./cron/tokenCron");

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start Token Cron Job
tokenCron.start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
