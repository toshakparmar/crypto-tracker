const cron = require("node-cron");
const axios = require("axios");

const COINGECKO_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

const saveHistoryData = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/history");
    if (response.data.success) {
      console.log(`✅ History data saved at ${new Date().toISOString()}`);
    } else {
      console.log(`❌ Failed to save history data: ${response.data.message}`);
    }
  } catch (error) {
    console.error("❌ Cron job error:", error.message);
  }
};

cron.schedule("0 * * * *", saveHistoryData, {
  timezone: "UTC",
});

console.log("📅 Cron job scheduled: Every hour at minute 0");

module.exports = { saveHistoryData };
