const mongoose = require("mongoose");

const TotalByCountry = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Number,
    required: true,
  },
  recovered: {
    type: Number,
    required: true,
  },
  critical: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  activeCases: {
    type: Number,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const totalWorldwide = mongoose.Schema({
  confirmed: {
    type: Number,
    required: true,
  },
  recovered: {
    type: Number,
    required: true,
  },
  critical: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

module.exports = {
  TotalByCountry: mongoose.model("TotalByCountry", TotalByCountry),
  TotalWorldwide: mongoose.model("worldwidetotal", totalWorldwide),
};
