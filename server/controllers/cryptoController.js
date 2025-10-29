const axios = require("axios");
const CurrentData = require("../models/CurrentData");
const HistoryData = require("../models/HistoryData");

const COINGECKO_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

const getCoins = async (req, res) => {
  try {
    let coins = await CurrentData.find().sort({ marketCap: -1 });

    if (coins.length === 0) {
      const response = await axios.get(COINGECKO_API);
      const apiData = response.data.map((coin) => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        marketCap: coin.market_cap,
        percentChange24h: coin.price_change_percentage_24h,
        image: coin.image,
        timestamp: new Date(),
      }));

      await CurrentData.deleteMany({});
      await CurrentData.insertMany(apiData);
      coins = apiData;
    }

    res.json({
      success: true,
      data: coins,
    });
  } catch (error) {
    console.error("Error fetching coins:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cryptocurrency data",
      error: error.message,
    });
  }
};

const saveHistory = async (req, res) => {
  try {
    const response = await axios.get(COINGECKO_API);
    const apiData = response.data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      percentChange24h: coin.price_change_percentage_24h,
      image: coin.image,
      timestamp: new Date(),
    }));

    await CurrentData.deleteMany({});
    await CurrentData.insertMany(apiData);
    await HistoryData.insertMany(apiData);

    res.json({
      success: true,
      message: "Price history saved successfully",
      data: apiData,
    });
  } catch (error) {
    console.error("Error saving history:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to save price history",
      error: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryData.find({ coinId })
      .sort({ timestamp: -1 })
      .limit(24);

    res.json({
      success: true,
      data: history.reverse(),
    });
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch price history",
      error: error.message,
    });
  }
};

module.exports = {
  getCoins,
  saveHistory,
  getHistory,
};
