const mongoose = require("mongoose");

const currentDataSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    unique: true,
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
  },
});

module.exports = mongoose.model("CurrentData", currentDataSchema);
