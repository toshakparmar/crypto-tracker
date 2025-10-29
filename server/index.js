require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const cryptoRoutes = require("./routes/cryptoRoutes");
require("./cron/cryptoUpdater");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/crypto-tracker"
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    } else {
      console.log("🔄 Running in API-only mode without database");
    }
  }
};

app.use("/api", cryptoRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Crypto Tracker API is running",
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Crypto Tracker API Server",
    version: "1.0.0",
    endpoints: [
      "GET /api/coins",
      "POST /api/history",
      "GET /api/history/:coinId",
      "GET /api/health",
    ],
    timestamp: new Date(),
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
  });
});

app.use((error, req, res, next) => {
  console.error("Server Error:", error.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(
      `🎯 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`
    );
    console.log("✅ Server is ready!");
  });
};

startServer();

module.exports = app;
