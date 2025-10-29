const mongoose = require("mongoose");

const historyDataSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  percentChange24h: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

historyDataSchema.index({ coinId: 1, timestamp: -1 });

module.exports = mongoose.model("HistoryData", historyDataSchema);
