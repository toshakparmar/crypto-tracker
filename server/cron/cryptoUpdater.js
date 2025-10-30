const cron = require("node-cron");
const axios = require("axios");

const COINGECKO_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&x_cg_demo_api_key=CG-4BfBv3YDGKLA8ueCdebMvwzL";

/**
 * Cron Job - Saves hourly price snapshots for historical data
 */
const saveHistoryData = async () => {
  try {
    console.log(`📸 Snapshot at ${new Date().toISOString()}`);
    const { data } = await axios.post("http://localhost:5000/api/history");

    if (data.success) {
      console.log(`✅ Saved ${data.data?.length || 0} coins`);
    } else {
      console.log(`❌ Failed: ${data.message}`);
    }
  } catch (error) {
    console.error("❌ Cron error:", error.message);
  }
};

cron.schedule("0 * * * *", saveHistoryData, { timezone: "UTC" });

console.log("📅 Cron initialized: Hourly snapshots");

module.exports = { saveHistoryData };
