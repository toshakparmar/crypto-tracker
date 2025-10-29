const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

router.get("/coins", cryptoController.getCoins);
router.post("/history", cryptoController.saveHistory);
router.get("/history/:coinId", cryptoController.getHistory);

module.exports = router;
