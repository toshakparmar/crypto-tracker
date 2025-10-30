const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

/**
 * Core API Routes - Only 3 endpoints needed for crypto tracker functionality
 * 1. GET /coins - Fetch current cryptocurrency data
 * 2. POST /history - Save current prices as historical data (for cron jobs)
 * 3. GET /history/:coinId - Get historical data for specific coin (real CoinGecko data preferred)
 */
router.get("/coins", cryptoController.getCoins);
router.post("/history", cryptoController.saveHistory);
router.get("/history/:coinId", cryptoController.getHistory);

module.exports = router;
